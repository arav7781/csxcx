import os
import sqlite3
from datetime import datetime, date as datetime_date, timedelta
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_caching import Cache
from dotenv import load_dotenv
from livekit import api
import uuid
from groq import Groq
from typing import List, Dict
import asyncio
import re
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np
import io
import traceback
from livekit.api import LiveKitAPI, ListRoomsRequest
from werkzeug.utils import secure_filename
import tempfile
import base64

# Load environment variables

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# Initialize caching
cache = Cache(app, config={'CACHE_TYPE': 'SimpleCache'})

# Custom SQLite date adapters
def adapt_date(date_obj):
    return date_obj.isoformat()

def adapt_datetime(datetime_obj):
    return datetime_obj.isoformat()

sqlite3.register_adapter(datetime_date, adapt_date)
sqlite3.register_adapter(datetime, adapt_datetime)

# Load environment variables
load_dotenv()



# Initialize Groq client
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise ValueError("API key for Groq is missing. Please set the GROQ_API_KEY in the .env file.")
client = Groq(api_key=GROQ_API_KEY)

# Define the Conversation class with the specified system prompt
class Conversation:
    def __init__(self):
        self.messages: List[Dict[str, str]] = [
            {"role": "system",
                "content": """You are BlueBot 1x, a Business Intelligence Assistant for BlueBox AI.
                Always greet the user with I am BlueBot 1x.
Do not use emojis or special characters.
Provide actionable strategies to help the user grow their  sales, including market trends, competitive analysis, and operational efficiency.
Analyze sales data to suggest targeted marketing, pricing strategies, or logistics improvements.
Respond in **plain text only** — do not use Markdown, bullet points, symbols, or any formatting. Maintain a clear, professional, and concise tone.
Your primary roles are:
1. Provide sales growth strategies and market insights
2. Assist with product design ideation (apps, websites, 3D models, or vision-related BI tasks)
3. Refer complex cases to our expert analysts or designers
Respond in English."""}
        ]
        self.active: bool = True

# Dictionary to store conversations
conversations: Dict[str, Conversation] = {}

# Function to get or create a conversation
def get_or_create_conversation(conversation_id: str) -> Conversation:
    if conversation_id not in conversations:
        conversations[conversation_id] = Conversation()
    return conversations[conversation_id]

# Function to query the Groq API and process <think> tags
def query_groq_api(conversation: Conversation, model: str) -> dict:
    try:
        completion = client.chat.completions.create(
            model=model,
            messages=conversation.messages,
            temperature=1,
            max_tokens=1024,
            top_p=1,
            stream=True,
            stop=None,
        )
        response = ""
        for chunk in completion:
            response += chunk.choices[0].delta.content or ""
        
        # Parse the response for <think> tags
        thinking_match = re.search(r"<think>(.*?)</think>", response, re.DOTALL)
        if thinking_match:
            thinking = thinking_match.group(1).strip()
            answer = response[thinking_match.end():].strip()
        else:
            thinking = ""
            answer = response.strip()
        
        return {"thinking": thinking, "answer": answer}
    except Exception as e:
        raise Exception(f"Error with Groq API: {str(e)}")

# Async functions for room management
async def get_rooms():
    api = LiveKitAPI()
    rooms = await api.room.list_rooms(ListRoomsRequest())
    await api.aclose()
    return [room.name for room in rooms.rooms]

async def generate_room_name():
    name = "room-" + str(uuid.uuid4())[:8]
    rooms = await get_rooms()
    while name in rooms:
        name = "room-" + str(uuid.uuid4())[:8]
    return name

# Synchronous route for getting token
@app.route("/getToken")
def get_token():
    name = request.args.get("name", "my name")
    language = request.args.get("language", "en")
    room = request.args.get("room", None)
    
    if not room:
        room = asyncio.run(generate_room_name())
        
    token = api.AccessToken(os.getenv("LIVEKIT_API_KEY"), os.getenv("LIVEKIT_API_SECRET")) \
        .with_identity(name)\
        .with_name(name)\
        .with_metadata(language)\
        .with_grants(api.VideoGrants(
            room_join=True,
            room=room
        ))
    
    return token.to_jwt()

# Chat endpoint
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    message = data.get("message")
    conversation_id = data.get("conversation_id")
    model = data.get("model", "gemma2-9b-it")  # Default to gemma2-9b-it if not specified
    
    if not message or not conversation_id:
        return jsonify({"error": "Missing message or conversation_id"}), 400
    
    conversation = get_or_create_conversation(conversation_id)
    if not conversation.active:
        return jsonify({"error": "The chat session has ended. Please start a new session."}), 400
    
    conversation.messages.append({"role": "user", "content": message})
    
    try:
        result = query_groq_api(conversation, model)
        conversation.messages.append({"role": "assistant", "content": result["answer"]})
        return jsonify({
            "thinking": result["thinking"],
            "answer": result["answer"],
            "conversation_id": conversation_id
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/analyze-image", methods=["POST"])
def analyze_image():
    try:
        data = request.get_json()
        image_data = data.get("image")
        prompt = data.get("prompt", "Analyze this image for dermatological, injury, or dental concerns.")
        model = data.get("model", "meta-llama/llama-4-scout-17b-16e-instruct")

        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        # Clean the base64 string
        if image_data.startswith("data:image"):
            image_data = image_data.split(",")[1]

        vision_prompt = (
            "You are a product design and business intelligence vision assistant. Analyze the provided image description or context and provide a professional assessment. "
            "If it's a website/app, suggest UI/UX improvements or feature enhancements. If it's a 3D model, suggest design optimizations or prototyping ideas. "
            "If it's a business intelligence visualization, suggest improvements for clarity or interactivity. "
            "Provide actionable recommendations and give step wise design suggestions."
         
            "Respond in **plain text only** — do not use Markdown, bullet points, symbols, or any formatting. Maintain a clear, professional, and concise tone."

        )
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": vision_prompt},
                {"role": "user", "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_data}"}}
                ]}
            ],
            temperature=0.7,
            max_tokens=1024,
        )

        result = completion.choices[0].message.content
        return jsonify({"answer": result})

    except Exception as e:
        print("Error during image analysis:", e)
        traceback.print_exc()  # This will print the full error stack trace
        return jsonify({"error": str(e)}), 500


# Database connection helper
def get_db_connection():
    try:
        conn = sqlite3.connect('pharma.db')
        conn.row_factory = sqlite3.Row
        return conn
    except sqlite3.Error as e:
        raise Exception(f"Database connection error: {str(e)}")

# Filter options endpoints
@app.route('/api/filter_options/divisions', methods=['GET'])
@cache.cached(timeout=3600)
def get_divisions():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DivisionName FROM Division ORDER BY DivisionName")
        rows = cursor.fetchall()
        conn.close()
        return jsonify([row['DivisionName'] for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/filter_options/territories', methods=['GET'])
@cache.cached(timeout=3600)
def get_territories():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT TerritoryName FROM Territory ORDER BY TerritoryName")
        rows = cursor.fetchall()
        conn.close()
        return jsonify([row['TerritoryName'] for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/filter_options/shipment_ids', methods=['GET'])
@cache.cached(timeout=3600)
def get_shipment_ids():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT ShipmentID FROM Shipment ORDER BY ShipmentID")
        rows = cursor.fetchall()
        conn.close()
        return jsonify([row['ShipmentID'] for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint for available plots
@app.route('/api/available_plots', methods=['GET'])
@cache.cached(timeout=3600)
def available_plots():
    plots = [
        {"id": "total_sales_by_month", "name": "Total Sales by Month", "type": "line", "parameters": ["start_date", "end_date", "division", "territory"]},
        {"id": "sales_per_division", "name": "Sales per Division", "type": "bar", "parameters": ["start_date", "end_date", "division"]},
        {"id": "top_selling_products", "name": "Top Selling Products", "type": "bar", "parameters": ["start_date", "end_date", "division", "top_n"]},
        {"id": "on_time_vs_delayed_shipments", "name": "On-time vs Delayed Shipments", "type": "pie", "parameters": ["start_date", "end_date"]},
        {"id": "shipments_by_transport_mode", "name": "Shipments by Transport Mode", "type": "bar", "parameters": ["start_date", "end_date"]},
        {"id": "temperature_trends", "name": "Temperature Trends per Shipment", "type": "line", "parameters": ["shipment_id"]},
        {"id": "temperature_violations", "name": "Shipments with Temperature Violations", "type": "bar", "parameters": []},
        {"id": "sales_by_employee", "name": "Sales by Employee", "type": "bar", "parameters": ["start_date", "end_date", "division", "territory"]},
        {"id": "sales_by_territory", "name": "Sales by Territory", "type": "bar", "parameters": ["start_date", "end_date", "territory"]},
        {"id": "sales_team_alignment", "name": "Sales Team Alignment", "type": "table", "parameters": ["division", "territory"]},
        {"id": "expiring_batches", "name": "Expiring Batches", "type": "table", "parameters": ["month"]},
        {"id": "upcoming_permit_expiries", "name": "Upcoming Drug Permit Expiries", "type": "table", "parameters": ["start_date", "end_date"]},
        {"id": "sales_growth_rate", "name": "Sales Growth Rate by Month", "type": "line", "parameters": ["start_date", "end_date", "division"]},
        {"id": "customer_segmentation", "name": "Customer Segmentation by Sales", "type": "pie", "parameters": ["start_date", "end_date"]},
        {"id": "product_profitability", "name": "Product Profitability Analysis", "type": "bar", "parameters": ["start_date", "end_date", "division"]},
        {"id": "sales_forecast", "name": "Sales Forecast", "type": "line", "parameters": ["start_date", "end_date"]},
        {"id": "employee_ranking", "name": "Employee Performance Ranking", "type": "bar", "parameters": ["start_date", "end_date", "division", "territory", "top_n"]},
        {"id": "shipment_cost_vs_sales", "name": "Shipment Cost vs. Sales", "type": "line", "parameters": ["start_date", "end_date"]}
    ]
    return jsonify(plots)

# Helper function to build SQL WHERE clause
def build_where_clause(params, valid_params):
    conditions = []
    values = []
    for param in valid_params:
        if param in params and params[param]:
            if param in ['start_date', 'end_date']:
                conditions.append(f"date(OrderDate) {'>=' if param == 'start_date' else '<='} ?")
                values.append(params[param])
            elif param == 'month':
                conditions.append("strftime('%Y-%m', ExpiryDate) = ?")
                values.append(params[param])
            elif param == 'division':
                conditions.append("d.DivisionName = ?")
                values.append(params[param])
            elif param == 'territory':
                conditions.append("t.TerritoryName = ?")
                values.append(params[param])
            elif param == 'shipment_id':
                conditions.append("ShipmentID = ?")
                values.append(params[param])
    return " AND ".join(conditions) if conditions else "", values

# Export report endpoint
@app.route('/api/export_report/<plot_id>', methods=['GET'])
def export_report(plot_id):
    try:
        params = request.args.to_dict()
        url = f"/api/{plot_id}" if plot_id != "temperature_trends" else f"/api/{plot_id}/{params.get('shipment_id', '1')}"
        response = app.test_client().get(url, query_string=params)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch data for export"}), 500
        
        data = response.get_json()
        df = pd.DataFrame(data)
        output = io.StringIO()
        df.to_csv(output, index=False)
        output.seek(0)
        
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8')),
            mimetype='text/csv',
            as_attachment=True,
            download_name=f"{plot_id}_report.csv"
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Sales Overview Routes
@app.route('/api/total_sales_by_month', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def total_sales_by_month():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division', 'territory']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT strftime('%Y-%m', OrderDate) as Month, SUM(TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
            JOIN Territory t ON e.TerritoryID = t.TerritoryID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY Month ORDER BY Month"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sales_per_division', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def sales_per_division():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT d.DivisionName, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY d.DivisionName"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/top_selling_products', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def top_selling_products():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division', 'top_n']
        where_clause, values = build_where_clause(params, valid_params)
        limit = int(params.get('top_n', 10))
        
        query = '''
            SELECT p.ProductName, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Product p ON p.DivisionID = (
                SELECT DivisionID FROM Employee WHERE EmployeeID = so.EmployeeID
            )
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += f" GROUP BY p.ProductName ORDER BY TotalSales DESC LIMIT {limit}"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Shipment Analysis Routes
@app.route('/api/on_time_vs_delayed_shipments', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def on_time_vs_delayed_shipments():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT 
                CASE 
                    WHEN ActualDelivery <= EstimatedDelivery THEN 'On Time'
                    ELSE 'Delayed'
                END as Status,
                COUNT(*) as Count
            FROM Shipment
            WHERE ActualDelivery IS NOT NULL
        '''
        if where_clause:
            query += f" AND {where_clause.replace('OrderDate', 'DispatchDate')}"
        query += " GROUP BY Status"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/shipments_by_transport_mode', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def shipments_by_transport_mode():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT TransportMode, COUNT(*) as Count
            FROM Shipment
        '''
        if where_clause:
            query += f" WHERE {where_clause.replace('OrderDate', 'DispatchDate')}"
        query += " GROUP BY TransportMode"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Cold Chain Monitoring Routes
@app.route('/api/temperature_trends/<int:shipment_id>', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def temperature_trends(shipment_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT CheckTime, Temperature
            FROM ColdChainLog
            WHERE ShipmentID = ?
            ORDER BY CheckTime
        ''', (shipment_id,))
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/temperature_violations', methods=['GET'])
@cache.cached(timeout=300)
def temperature_violations():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            SELECT DISTINCT ShipmentID
            FROM ColdChainLog
            WHERE Temperature < 2 OR Temperature > 8
        ''')
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Employee & Territory Performance Routes
@app.route('/api/sales_by_employee', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def sales_by_employee():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division', 'territory']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT e.FirstName || ' ' || e.LastName as EmployeeName, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
            JOIN Territory t ON e.TerritoryID = t.TerritoryID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY e.EmployeeID, e.FirstName, e.LastName ORDER BY TotalSales DESC LIMIT 10"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sales_by_territory', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def sales_by_territory():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'territory']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT t.TerritoryName, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Territory t ON e.TerritoryID = t.TerritoryID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY t.TerritoryName"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sales_team_alignment', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def sales_team_alignment():
    try:
        params = request.args.to_dict()
        valid_params = ['division', 'territory']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT st.TeamName, d.DivisionName, e.FirstName || ' ' || e.LastName as ManagerName, t.TerritoryName
            FROM Sales_Team st
            JOIN Division d ON st.DivisionID = d.DivisionID
            JOIN Employee e ON st.ManagerID = e.EmployeeID
            JOIN Territory t ON st.TerritoryID = t.TerritoryID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Compliance & Batch Routes
@app.route('/api/expiring_batches', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def expiring_batches():
    try:
        params = request.args.to_dict()
        valid_params = ['month']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT BatchID, ProductID, ExpiryDate
            FROM Batch
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        else:
            current_month = datetime.now().strftime('%Y-%m')
            query += " WHERE strftime('%Y-%m', ExpiryDate) = ?"
            values.append(current_month)
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/upcoming_permit_expiries', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def upcoming_permit_expiries():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT PermitNumber, ShipmentID, ValidTill
            FROM DrugPermit
        '''
        if where_clause:
            query += f" WHERE {where_clause.replace('OrderDate', 'ValidTill')}"
        else:
            query += " WHERE ValidTill BETWEEN date('now') AND date('now', '+1 month')"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# New Visualization Routes
@app.route('/api/sales_growth_rate', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def sales_growth_rate():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT strftime('%Y-%m', OrderDate) as Month, SUM(TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY Month ORDER BY Month"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        # Calculate growth rate
        result = []
        for i in range(1, len(rows)):
            prev_sales = rows[i-1]['TotalSales']
            curr_sales = rows[i]['TotalSales']
            growth_rate = ((curr_sales - prev_sales) / prev_sales * 100) if prev_sales > 0 else 0
            result.append({
                'Month': rows[i]['Month'],
                'GrowthRate': round(growth_rate, 2)
            })
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/customer_segmentation', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def customer_segmentation():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT so.CustomerID, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY so.CustomerID"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        # Segment customers
        sales = [row['TotalSales'] for row in rows]
        if not sales:
            return jsonify([])
        
        high_threshold = np.percentile(sales, 75)
        low_threshold = np.percentile(sales, 25)
        
        segments = {'High': 0, 'Medium': 0, 'Low': 0}
        for row in rows:
            if row['TotalSales'] >= high_threshold:
                segments['High'] += 1
            elif row['TotalSales'] <= low_threshold:
                segments['Low'] += 1
            else:
                segments['Medium'] += 1
        
        return jsonify([
            {'Segment': 'High Value', 'Count': segments['High']},
            {'Segment': 'Medium Value', 'Count': segments['Medium']},
            {'Segment': 'Low Value', 'Count': segments['Low']}
        ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/product_profitability', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def product_profitability():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT p.ProductName, AVG(p.MRP - p.PTR) as ProfitMargin, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Product p ON p.DivisionID = (
                SELECT DivisionID FROM Employee WHERE EmployeeID = so.EmployeeID
            )
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY p.ProductName"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/sales_forecast', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def sales_forecast():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT strftime('%Y-%m', OrderDate) as Month, SUM(TotalAmount) as TotalSales
            FROM Sales_Order so
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY Month ORDER BY Month"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = [dict(row) for row in cursor.fetchall()]
        conn.close()
        
        # Simple linear regression for forecasting
        if len(rows) < 2:
            return jsonify(rows)
        
        months = [datetime.strptime(row['Month'], '%Y-%m').timestamp() for row in rows]
        sales = [row['TotalSales'] for row in rows]
        
        X = np.array(months).reshape(-1, 1)
        y = np.array(sales)
        
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict next 3 months
        last_month = datetime.strptime(rows[-1]['Month'], '%Y-%m')
        future_months = []
        for i in range(1, 4):
            next_month = last_month + timedelta(days=30*i)
            future_months.append(next_month)
        
        future_timestamps = np.array([m.timestamp() for m in future_months]).reshape(-1, 1)
        predictions = model.predict(future_timestamps)
        
        result = rows + [
            {'Month': m.strftime('%Y-%m'), 'TotalSales': round(p, 2), 'IsForecast': True}
            for m, p in zip(future_months, predictions)
        ]
        
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/employee_ranking', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def employee_ranking():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date', 'division', 'territory', 'top_n']
        where_clause, values = build_where_clause(params, valid_params)
        limit = int(params.get('top_n', 10))
        
        query = '''
            SELECT e.FirstName || ' ' || e.LastName as EmployeeName, SUM(so.TotalAmount) as TotalSales
            FROM Sales_Order so
            JOIN Employee e ON so.EmployeeID = e.EmployeeID
            JOIN Division d ON e.DivisionID = d.DivisionID
            JOIN Territory t ON e.TerritoryID = t.TerritoryID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += f" GROUP BY e.EmployeeID, e.FirstName, e.LastName ORDER BY TotalSales DESC LIMIT {limit}"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/shipment_cost_vs_sales', methods=['GET'])
@cache.cached(timeout=300, query_string=True)
def shipment_cost_vs_sales():
    try:
        params = request.args.to_dict()
        valid_params = ['start_date', 'end_date']
        where_clause, values = build_where_clause(params, valid_params)
        
        query = '''
            SELECT strftime('%Y-%m', so.OrderDate) as Month, 
                   SUM(so.TotalAmount) as TotalSales,
                   SUM(s.TransportCharge) as TotalCost
            FROM Sales_Order so
            JOIN Shipment s ON so.OrderID = s.OrderID
        '''
        if where_clause:
            query += f" WHERE {where_clause}"
        query += " GROUP BY Month ORDER BY Month"
        
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(query, values)
        rows = cursor.fetchall()
        conn.close()
        return jsonify([dict(row) for row in rows])
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)