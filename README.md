# Pharma BI assistant

A business-intelligence app for a pharmaceutical distributor: dashboards over sales, shipments and cold-chain data,
and a voice assistant you can ask about them.

## Backend (`backend/server.py`)

Flask API over SQLite databases (`pharma.db`, `business_intelligence.db`, `hospital.db`), with response caching
(Flask-Caching, 1 h) on the filter endpoints.

| Area | Endpoints |
| --- | --- |
| Sales | `/api/total_sales_by_month`, `/api/sales_per_division`, `/api/sales_by_territory`, `/api/sales_by_employee`, `/api/sales_growth_rate`, `/api/top_selling_products`, `/api/product_profitability`, `/api/employee_ranking`, `/api/sales_team_alignment` |
| Customers | `/api/customer_segmentation` |
| Logistics | `/api/on_time_vs_delayed_shipments`, `/api/shipments_by_transport_mode`, `/api/shipment_cost_vs_sales` |
| Cold chain and compliance | `/api/temperature_trends/<shipment_id>`, `/api/temperature_violations`, `/api/expiring_batches`, `/api/upcoming_permit_expiries` |
| Forecasting | `/api/sales_forecast` (linear regression over monthly sales) |
| Filters and export | `/api/filter_options/{divisions,territories,shipment_ids}`, `/api/available_plots`, `/api/export_report/<plot_id>` |
| Assistant | `/getToken` (LiveKit access token), `/chat` (Groq-hosted LLM), `/analyze-image` |

## Front end

Next.js app with a dashboard, chatbot, voice "discussion rooms" over LiveKit, docs and a visualisation page.
User accounts, credits and room transcripts are stored in [Convex](convex/schema.js) (self-hostable with the
included `docker-compose.yml`); sign-in uses Stack Auth; speech-to-text uses AssemblyAI.

## Run

```bash
# API
cd backend && pip install -r requirements.txt && python server.py      # :5000

# Convex (self-hosted) and the web app
docker compose up -d
npm install && npm run dev                                              # :3000
```

## Tech

Python · Flask · SQLite · pandas · scikit-learn · LiveKit · Groq · Next.js · Convex · Stack Auth · AssemblyAI · Docker
