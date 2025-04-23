import sqlite3
from faker import Faker
import random
from datetime import datetime, timedelta
from datetime import date as datetime_date

# Custom date adapter to handle Python date objects
def adapt_date(date_obj):
    return date_obj.isoformat()

# Custom datetime adapter to handle Python datetime objects
def adapt_datetime(datetime_obj):
    return datetime_obj.isoformat()

# Register adapters
sqlite3.register_adapter(datetime_date, adapt_date)
sqlite3.register_adapter(datetime, adapt_datetime)

# Initialize Faker with Indian locale
fake = Faker('en_IN')

# Connect to SQLite database
conn = sqlite3.connect('pharma.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''
CREATE TABLE Division (
    DivisionID INTEGER PRIMARY KEY AUTOINCREMENT,
    DivisionName TEXT NOT NULL,
    Specialization TEXT NOT NULL,
    NSM_ID INTEGER,
    FOREIGN KEY (NSM_ID) REFERENCES Employee(EmployeeID)
)
''')

cursor.execute('''
CREATE TABLE Product (
    ProductID INTEGER PRIMARY KEY AUTOINCREMENT,
    ProductName TEXT NOT NULL,
    DivisionID INTEGER NOT NULL,
    TherapeuticClass TEXT NOT NULL,
    MRP REAL NOT NULL,
    PTR REAL,
    PTS REAL,
    HSN_Code TEXT NOT NULL,
    Schedule TEXT CHECK (Schedule IN ('H', 'H1', 'X')),
    IsNLEM BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (DivisionID) REFERENCES Division(DivisionID)
)
''')

cursor.execute('''
CREATE TABLE ClearingForwardingAgent (
    AgentID INTEGER PRIMARY KEY AUTOINCREMENT,
    AgentName TEXT NOT NULL,
    LicenseNumber TEXT UNIQUE NOT NULL,
    GSTIN TEXT NOT NULL,
    PAN TEXT NOT NULL,
    Address TEXT,
    ContactPerson TEXT,
    Phone TEXT,
    ServiceAreas TEXT
)
''')

cursor.execute('''
CREATE TABLE CnfServiceContract (
    ContractID INTEGER PRIMARY KEY AUTOINCREMENT,
    AgentID INTEGER NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    CommissionType TEXT CHECK (CommissionType IN ('Per Shipment', 'Percentage', 'Monthly Retainer')),
    Terms TEXT,
    FOREIGN KEY (AgentID) REFERENCES ClearingForwardingAgent(AgentID)
)
''')

cursor.execute('''
CREATE TABLE Shipment (
    ShipmentID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER NOT NULL,
    AgentID INTEGER NOT NULL,
    DispatchDate DATE NOT NULL,
    EstimatedDelivery DATE,
    ActualDelivery DATE,
    LRNumber TEXT NOT NULL,
    VehicleNumber TEXT,
    TransportMode TEXT CHECK (TransportMode IN ('Road', 'Air', 'Rail', 'Courier')),
    CargoTemperature TEXT,
    TransportCharge REAL,
    FOREIGN KEY (OrderID) REFERENCES Sales_Order(OrderID),
    FOREIGN KEY (AgentID) REFERENCES ClearingForwardingAgent(AgentID)
)
''')

cursor.execute('''
CREATE TABLE CustomsClearance (
    ClearanceID INTEGER PRIMARY KEY AUTOINCREMENT,
    ShipmentID INTEGER NOT NULL,
    BillOfEntry TEXT,
    CustomsDuty REAL,
    ICD TEXT,
    Status TEXT CHECK (Status IN ('Pending', 'Cleared', 'Held')),
    Remarks TEXT,
    FOREIGN KEY (ShipmentID) REFERENCES Shipment(ShipmentID)
)
''')

cursor.execute('''
CREATE TABLE ColdChainLog (
    LogID INTEGER PRIMARY KEY AUTOINCREMENT,
    ShipmentID INTEGER NOT NULL,
    CheckTime DATETIME NOT NULL,
    Temperature REAL NOT NULL,
    Humidity REAL,
    FOREIGN KEY (ShipmentID) REFERENCES Shipment(ShipmentID)
)
''')

cursor.execute('''
CREATE TABLE Sales_Team (
    TeamID INTEGER PRIMARY KEY AUTOINCREMENT,
    TeamName TEXT,
    DivisionID INTEGER NOT NULL,
    ManagerID INTEGER NOT NULL,
    TerritoryID INTEGER NOT NULL,
    FOREIGN KEY (DivisionID) REFERENCES Division(DivisionID),
    FOREIGN KEY (ManagerID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (TerritoryID) REFERENCES Territory(TerritoryID)
)
''')

cursor.execute('''
CREATE TABLE Employee (
    EmployeeID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT,
    LastName TEXT,
    Email TEXT,
    Phone TEXT,
    HireDate DATE,
    RoleID INTEGER,
    ManagerID INTEGER NULL,
    DivisionID INTEGER,
    TerritoryID INTEGER NULL,
    TeamID INTEGER,
    FOREIGN KEY (RoleID) REFERENCES Role(RoleID),
    FOREIGN KEY (ManagerID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (DivisionID) REFERENCES Division(DivisionID),
    FOREIGN KEY (TerritoryID) REFERENCES Territory(TerritoryID),
    FOREIGN KEY (TeamID) REFERENCES Sales_Team(TeamID)
)
''')

cursor.execute('''
CREATE TABLE Role (
    RoleID INTEGER PRIMARY KEY AUTOINCREMENT,
    RoleName TEXT NOT NULL,
    HierarchyLevel INTEGER NOT NULL
)
''')

cursor.execute('''
CREATE TABLE Territory (
    TerritoryID INTEGER PRIMARY KEY AUTOINCREMENT,
    TerritoryName TEXT,
    Region TEXT,
    GST_Code TEXT
)
''')

cursor.execute('''
CREATE TABLE Customer (
    CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,
    CustomerName TEXT,
    Address TEXT,
    City TEXT,
    State TEXT,
    ZipCode TEXT,
    Phone TEXT,
    GSTIN TEXT,
    CustomerType TEXT CHECK (CustomerType IN ('Hospital', 'Pharmacy', 'Clinic', 'Physician')),
    DeliveryPreference TEXT CHECK (DeliveryPreference IN ('C&F Agent', 'Self Pickup', 'Direct Dispatch'))
)
''')

cursor.execute('''
CREATE TABLE Sales_Order (
    OrderID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderDate DATE NOT NULL,
    CustomerID INTEGER NOT NULL,
    EmployeeID INTEGER NOT NULL,
    AgentID INTEGER,
    TotalAmount REAL,
    OrderType TEXT CHECK (OrderType IN ('Domestic', 'Export', 'Government Tender')),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (AgentID) REFERENCES ClearingForwardingAgent(AgentID)
)
''')

cursor.execute('''
CREATE TABLE Invoice (
    InvoiceID INTEGER PRIMARY KEY AUTOINCREMENT,
    OrderID INTEGER NOT NULL,
    InvoiceDate DATE NOT NULL,
    CFormNumber TEXT,
    EWaybillNumber TEXT,
    TransportCharge REAL,
    InsuranceCharge REAL,
    CGST REAL,
    SGST REAL,
    IGST REAL,
    TotalAmount REAL,
    FOREIGN KEY (OrderID) REFERENCES Sales_Order(OrderID)
)
''')

cursor.execute('''
CREATE TABLE DrugPermit (
    PermitID INTEGER PRIMARY KEY AUTOINCREMENT,
    ShipmentID INTEGER NOT NULL,
    PermitNumber TEXT NOT NULL,
    IssuingAuthority TEXT,
    ValidTill DATE,
    FOREIGN KEY (ShipmentID) REFERENCES Shipment(ShipmentID)
)
''')

cursor.execute('''
CREATE TABLE Batch (
    BatchID TEXT PRIMARY KEY,
    ProductID INTEGER NOT NULL,
    ManufacturingDate DATE NOT NULL,
    ExpiryDate DATE NOT NULL,
    MRP REAL NOT NULL,
    PTR REAL,
    PTS REAL,
    CONSTRAINT chk_batch_dates CHECK (ExpiryDate > ManufacturingDate),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
)
''')

# Insert sample data
# Roles
roles = [
    ('National Sales Manager', 1),
    ('Regional Sales Manager', 2),
    ('Area Sales Manager', 3),
    ('Sales Representative', 4),
    ('Logistics Coordinator', 5),
    ('Compliance Officer', 6)
]
cursor.executemany('INSERT INTO Role (RoleName, HierarchyLevel) VALUES (?, ?)', roles)

# Territories
territories = [
    ('North Zone', 'North', '01'),
    ('South Zone', 'South', '02'),
    ('East Zone', 'East', '03'),
    ('West Zone', 'West', '04')
]
cursor.executemany('INSERT INTO Territory (TerritoryName, Region, GST_Code) VALUES (?, ?, ?)', territories)

# Divisions
divisions = [
    ('Cough & Cold', 'Respiratory'),
    ('Cardiology', 'Cardiovascular'),
    ('Diabetes', 'Endocrinology'),
    ('Orthopedics', 'Musculoskeletal')
]
cursor.executemany('INSERT INTO Division (DivisionName, Specialization) VALUES (?, ?)', divisions)

# Employees (starting with NSMs)
nsm_ids = []
for i in range(1, 5):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = f"{first_name.lower()}.{last_name.lower()}@pharma.com"
    phone = fake.phone_number()
    hire_date = fake.date_between(start_date='-5y', end_date='today')
    role_id = 1
    division_id = i
    cursor.execute('INSERT INTO Employee (FirstName, LastName, Email, Phone, HireDate, RoleID, DivisionID) VALUES (?, ?, ?, ?, ?, ?, ?)',
                   (first_name, last_name, email, phone, hire_date, role_id, division_id))
    nsm_ids.append(cursor.lastrowid)

# Update divisions with NSM_ID
for i, nsm_id in enumerate(nsm_ids, start=1):
    cursor.execute('UPDATE Division SET NSM_ID = ? WHERE DivisionID = ?', (nsm_id, i))

# More employees
for _ in range(96):
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = f"{first_name.lower()}.{last_name.lower()}@pharma.com"
    phone = fake.phone_number()
    hire_date = fake.date_between(start_date='-5y', end_date='today')
    role_id = random.choice([2, 3, 4, 5, 6])
    manager_id = random.choice(nsm_ids) if role_id != 1 else None
    division_id = random.randint(1, 4)
    territory_id = random.randint(1, 4)
    cursor.execute('INSERT INTO Employee (FirstName, LastName, Email, Phone, HireDate, RoleID, ManagerID, DivisionID, TerritoryID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                   (first_name, last_name, email, phone, hire_date, role_id, manager_id, division_id, territory_id))

# Sales Teams
for i in range(1, 5):
    team_name = f"Team {divisions[i-1][0]}"
    division_id = i
    manager_id = nsm_ids[i-1]
    territory_id = random.randint(1, 4)
    cursor.execute('INSERT INTO Sales_Team (TeamName, DivisionID, ManagerID, TerritoryID) VALUES (?, ?, ?, ?)',
                   (team_name, division_id, manager_id, territory_id))

# Products
therapeutic_classes = ['Antibiotics', 'Analgesics', 'Antivirals', 'Antidiabetics', 'Antihypertensives']
schedules = ['H', 'H1', 'X']
for _ in range(100):
    product_name = fake.company() + ' ' + fake.word().capitalize()
    division_id = random.randint(1, 4)
    therapeutic_class = random.choice(therapeutic_classes)
    mrp = round(random.uniform(100, 5000), 2)
    ptr = round(mrp * 0.8, 2)
    pts = round(ptr * 0.9, 2)
    hsn_code = fake.bothify(text='####-####')
    schedule = random.choice(schedules)
    is_nlem = random.choice([0, 1])
    cursor.execute('INSERT INTO Product (ProductName, DivisionID, TherapeuticClass, MRP, PTR, PTS, HSN_Code, Schedule, IsNLEM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                   (product_name, division_id, therapeutic_class, mrp, ptr, pts, hsn_code, schedule, is_nlem))

# C&F Agents
for _ in range(100):
    agent_name = fake.company()
    license_number = fake.unique.bothify(text='LIC-####')
    gstin = fake.bothify(text='??##############')
    pan = fake.bothify(text='?????#####?')
    address = fake.address()
    contact_person = fake.name()
    phone = fake.phone_number()
    service_areas = ', '.join(fake.random_elements(elements=('Delhi', 'Mumbai', 'Chennai', 'Kolkata', 'Bangalore'), length=3))
    cursor.execute('INSERT INTO ClearingForwardingAgent (AgentName, LicenseNumber, GSTIN, PAN, Address, ContactPerson, Phone, ServiceAreas) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                   (agent_name, license_number, gstin, pan, address, contact_person, phone, service_areas))

# CnfServiceContracts
commission_types = ['Per Shipment', 'Percentage', 'Monthly Retainer']
for agent_id in range(1, 101):
    start_date = fake.date_between(start_date='-2y', end_date='today')
    end_date = fake.date_between(start_date=start_date, end_date='+2y')
    commission_type = random.choice(commission_types)
    terms = fake.text()
    cursor.execute('INSERT INTO CnfServiceContract (AgentID, StartDate, EndDate, CommissionType, Terms) VALUES (?, ?, ?, ?, ?)',
                   (agent_id, start_date, end_date, commission_type, terms))

# Customers
customer_types = ['Hospital', 'Pharmacy', 'Clinic', 'Physician']
delivery_preferences = ['C&F Agent', 'Self Pickup', 'Direct Dispatch']
for _ in range(100):
    customer_name = fake.company()
    address = fake.address()
    city = fake.city()
    state = fake.state()
    zipcode = fake.postcode()
    phone = fake.phone_number()
    gstin = fake.bothify(text='??##############')
    customer_type = random.choice(customer_types)
    delivery_preference = random.choice(delivery_preferences)
    cursor.execute('INSERT INTO Customer (CustomerName, Address, City, State, ZipCode, Phone, GSTIN, CustomerType, DeliveryPreference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                   (customer_name, address, city, state, zipcode, phone, gstin, customer_type, delivery_preference))

# Sales Orders
order_types = ['Domestic', 'Export', 'Government Tender']
for _ in range(100):
    order_date = fake.date_between(start_date='-1y', end_date='today')
    customer_id = random.randint(1, 100)
    employee_id = random.randint(1, 100)
    agent_id = random.randint(1, 100) if random.choice([True, False]) else None
    total_amount = round(random.uniform(100000, 1000000), 2)  # In lakhs and thousands
    order_type = random.choice(order_types)
    cursor.execute('INSERT INTO Sales_Order (OrderDate, CustomerID, EmployeeID, AgentID, TotalAmount, OrderType) VALUES (?, ?, ?, ?, ?, ?)',
                   (order_date, customer_id, employee_id, agent_id, total_amount, order_type))

# Shipments
transport_modes = ['Road', 'Air', 'Rail', 'Courier']
for order_id in range(1, 101):
    agent_id = random.randint(1, 100)
    dispatch_date = fake.date_between(start_date='-1y', end_date='today')
    estimated_delivery = dispatch_date + timedelta(days=random.randint(1, 7))
    actual_delivery = estimated_delivery + timedelta(days=random.randint(-1, 3))
    lr_number = fake.bothify(text='LR-####')
    vehicle_number = fake.bothify(text='??####')
    transport_mode = random.choice(transport_modes)
    cargo_temperature = f"{random.uniform(2, 8):.1f}°C" if random.choice([True, False]) else None
    transport_charge = round(random.uniform(500, 5000), 2)
    cursor.execute('INSERT INTO Shipment (OrderID, AgentID, DispatchDate, EstimatedDelivery, ActualDelivery, LRNumber, VehicleNumber, TransportMode, CargoTemperature, TransportCharge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                   (order_id, agent_id, dispatch_date, estimated_delivery, actual_delivery, lr_number, vehicle_number, transport_mode, cargo_temperature, transport_charge))

# CustomsClearance
statuses = ['Pending', 'Cleared', 'Held']
for shipment_id in range(1, 101):
    if random.choice([True, False]):
        bill_of_entry = fake.bothify(text='BOE-####')
        customs_duty = round(random.uniform(1000, 10000), 2)
        icd = fake.city()
        status = random.choice(statuses)
        remarks = fake.sentence()
        cursor.execute('INSERT INTO CustomsClearance (ShipmentID, BillOfEntry, CustomsDuty, ICD, Status, Remarks) VALUES (?, ?, ?, ?, ?, ?)',
                       (shipment_id, bill_of_entry, customs_duty, icd, status, remarks))

# ColdChainLog
for shipment_id in range(1, 101):
    for _ in range(random.randint(1, 5)):
        check_time = fake.date_time_between(start_date='-1y', end_date='now')
        temperature = round(random.uniform(2, 8), 2)
        humidity = round(random.uniform(30, 60), 2)
        cursor.execute('INSERT INTO ColdChainLog (ShipmentID, CheckTime, Temperature, Humidity) VALUES (?, ?, ?, ?)',
                       (shipment_id, check_time, temperature, humidity))

# Invoices
for order_id in range(1, 101):
    invoice_date = fake.date_between(start_date='-1y', end_date='today')
    cform_number = fake.bothify(text='CF-####') if random.choice([True, False]) else None
    ewaybill_number = fake.bothify(text='EWB-####') if random.choice([True, False]) else None
    transport_charge = round(random.uniform(500, 5000), 2)
    insurance_charge = round(random.uniform(100, 1000), 2)
    cgst = round(random.uniform(0, 10000), 2)
    sgst = round(random.uniform(0, 10000), 2)
    igst = round(random.uniform(0, 10000), 2)
    total_amount = round(random.uniform(100000, 1000000), 2)
    cursor.execute('INSERT INTO Invoice (OrderID, InvoiceDate, CFormNumber, EWaybillNumber, TransportCharge, InsuranceCharge, CGST, SGST, IGST, TotalAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                   (order_id, invoice_date, cform_number, ewaybill_number, transport_charge, insurance_charge, cgst, sgst, igst, total_amount))

# DrugPermits
for shipment_id in range(1, 101):
    if random.choice([True, False]):
        permit_number = fake.bothify(text='DP-####')
        issuing_authority = fake.company()
        valid_till = fake.date_between(start_date='today', end_date='+2y')
        cursor.execute('INSERT INTO DrugPermit (ShipmentID, PermitNumber, IssuingAuthority, ValidTill) VALUES (?, ?, ?, ?)',
                       (shipment_id, permit_number, issuing_authority, valid_till))

# Batches
batch_counter = 1  # To ensure unique BatchIDs
for product_id in range(1, 101):
    for _ in range(random.randint(1, 3)):
        # Generate unique BatchID with a counter
        batch_id = f"PROD{product_id:03d}-B{fake.date_this_year().strftime('%y%m%d')}-{batch_counter:03d}"
        batch_counter += 1
        manufacturing_date = fake.date_between(start_date='-2y', end_date='today')
        expiry_date = manufacturing_date + timedelta(days=random.randint(365, 730))
        mrp = round(random.uniform(100, 5000), 2)
        ptr = round(mrp * 0.8, 2)
        pts = round(ptr * 0.9, 2)
        cursor.execute('INSERT INTO Batch (BatchID, ProductID, ManufacturingDate, ExpiryDate, MRP, PTR, PTS) VALUES (?, ?, ?, ?, ?, ?, ?)',
                       (batch_id, product_id, manufacturing_date, expiry_date, mrp, ptr, pts))

# Commit and close
conn.commit()
conn.close()