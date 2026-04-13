# ✈️ Air Cargo Analysis — SQL Course-End Project

**AI-Powered React Dashboard** · **MySQL** · **20 SQL Tasks Completed**

> A full-stack React dashboard built over a MySQL database schema that models an airline's cargo operations — covering customers, routes, passengers, and ticket sales. All 20 SQL tasks from the course-end project are implemented and visualised interactively.

---

## 📌 Problem Statement

Airline cargo operations generate large volumes of structured data across passengers, routes, ticket sales, and customer records. Without a dedicated analytical tool, teams face:

- **No visibility** into revenue performance across airline brands or ticket classes
- **No route intelligence** — long-haul vs. short-haul breakdown requires manual queries
- **No centralised view** of passenger records and class distribution
- **Scattered SQL logic** with no interface to explore results interactively

**Air Cargo Analysis** addresses all of this by combining a fully normalised MySQL schema with a React dashboard — giving data teams a live, filterable interface to explore every dimension of the dataset.

---

## 💡 Our Solution

Air Cargo Analysis is a React application driven entirely by the data modelled in the SQL project. It surfaces all 20 SQL tasks — from basic SELECTs and JOINs through to window functions, stored procedures, cursors, and user-defined functions — as an interactive, tab-based dashboard.

### Core Capabilities

| Capability | Description |
|---|---|
| **Overview Dashboard** | Key metrics, ER diagram, revenue by brand, class distribution chart |
| **Passenger Explorer** | Searchable + filterable table of all 50 flight records |
| **Route Analyser** | All 49 routes with SDT / IDT / LDT distance categorisation |
| **Revenue Analytics** | Per-class revenue, max ticket prices (window function), complimentary services |
| **SQL Task Viewer** | All 20 tasks with descriptions and syntax-highlighted SQL |

---

## 🖥️ Screenshots

> Dashboard · Passengers · Routes · Revenue · SQL Tasks

*(Add screenshots here after running the app locally)*

---

## 🗂️ System Architecture

```
┌─────────────────────────────────────────────────────┐
│                  React Frontend                      │
│                                                      │
│  Overview  │  Passengers  │  Routes  │  Revenue      │
│                  SQL Tasks                           │
└────────────────────┬────────────────────────────────┘
                     │ in-memory data (from SQL export)
┌────────────────────▼────────────────────────────────┐
│                  data.js                             │
│  passengers · routes · tickets · tasks               │
│  (mirrors the air_cargo MySQL database)              │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              MySQL Database (air_cargo)              │
│                                                      │
│  customer · routes · passengers_on_flights           │
│  ticket_details · route_details                      │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. **MySQL schema** is set up using `air_cargo_analysis.sql`
2. The React app loads the same dataset from `src/data.js` (mirrored from the DB)
3. All filtering, aggregation, and categorisation logic runs in the browser
4. SQL task snippets are stored alongside their descriptions for reference

---

## 🗃️ Database Schema

### Tables

| Table | Purpose |
|---|---|
| `customer` | Registered passenger details — name, DOB, gender |
| `routes` | Flight routes with origin, destination, aircraft, and distance |
| `passengers_on_flights` | Travel records linking customers to routes |
| `ticket_details` | Ticket purchases with class, price, and airline brand |
| `route_details` | Constrained copy of routes with CHECK and UNIQUE constraints |

### Entity Relationship Diagram

```
customer ──────────────────────────── ticket_details
  │  customer_id (PK)                   customer_id (FK)
  │  first_name                         aircraft_id
  │  last_name                          class_id
  │  date_of_birth                      price_per_ticket
  │  gender                             brand
  │
  └──────────── passengers_on_flights ──── routes
                  customer_id (FK)          route_id (PK)
                  route_id (FK)             flight_num
                  aircraft_id               origin_airport
                  seat_num                  destination_airport
                  class_id                  aircraft_id
                  travel_date               distance_miles
```

---

## 🧩 Technology Stack

### Frontend

| Package | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| React Router DOM | 6 | Client-side tab navigation |
| CSS Modules | — | Scoped component styling |
| IBM Plex Mono | — | Monospace font for SQL code |
| Sora | — | Display font for UI |
| HTML5 Canvas | — | Donut chart rendering |

### Backend / Database

| Tool | Purpose |
|---|---|
| MySQL 8+ | Primary relational database |
| SQL (DDL + DML) | Schema creation, data insertion, all 20 task queries |
| Stored Procedures | Tasks 16, 17, 18 — route and passenger queries |
| Stored Functions | Task 19 — `CheckComplimentaryServices()` |
| Cursor | Task 20 — `GetFirstScottCustomer()` |
| Window Functions | Task 11 — `MAX() OVER (PARTITION BY class_id)` |

---

## 📁 Project Structure

```
air-cargo-app/
├── public/
│   └── index.html                  # HTML shell with Google Fonts
├── src/
│   ├── data.js                     # All DB data — passengers, routes, tickets, tasks
│   ├── index.js                    # React DOM entry point
│   ├── index.css                   # Global CSS variables and base styles
│   ├── App.jsx                     # Root layout + 5-tab navigation
│   ├── App.module.css
│   └── components/
│       ├── Badge.jsx               # Reusable coloured class/category badges
│       ├── Overview.jsx            # Metrics, ER diagram, bar chart, donut chart
│       ├── Overview.module.css
│       ├── Passengers.jsx          # Searchable + filterable passengers table
│       ├── Routes.jsx              # Routes table with aircraft filter + SDT/IDT/LDT
│       ├── Revenue.jsx             # Per-class revenue, max prices, complimentary list
│       ├── Revenue.module.css
│       ├── SqlTasks.jsx            # All 20 tasks — expandable cards with SQL snippets
│       ├── SqlTasks.module.css
│       └── TablePage.module.css    # Shared table, filter, and search styles
├── README.md
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or later — [nodejs.org](https://nodejs.org)
- **MySQL** 8+ (for running the SQL script directly)
- **VS Code** (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/air-cargo-analysis.git
cd air-cargo-analysis
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the app

```bash
npm start
```

The app opens at **http://localhost:3000** automatically.

### 4. (Optional) Run the SQL script

To set up the MySQL database and run all 20 task queries:

```bash
mysql -u root -p < air_cargo_analysis.sql
```

Or open `air_cargo_analysis.sql` in MySQL Workbench and execute it.

---

## 🔌 Running in VS Code

```
1. File → Open Folder → select the air-cargo-app folder
2. Terminal → New Terminal  (Ctrl + `)
3. npm install
4. npm start
```

> The browser opens at http://localhost:3000

---

## 📊 Dashboard Features

### Overview Tab
- **4 key metrics** — total customers, active routes, flight records, total revenue
- **Revenue by brand** — animated bar chart (Emirates, Qatar Airways, Jet Airways, British Airways)
- **Class distribution** — Canvas donut chart with passenger count per class
- **ER Diagram** — visual schema showing all table relationships and key types (PK / FK)
- **Stored procedures** — quick reference list for Tasks 16–20

### Passengers Tab
- Full table of all 50 `passengers_on_flights` records
- **Live search** — filter by customer ID, seat number, or airport code
- **Class filter** — Business / Economy / Economy Plus / First Class buttons
- Colour-coded class badges and seat codes in monospace font

### Routes Tab
- All 49 routes from the `routes` table
- **Distance category metrics** — SDT / IDT / LDT counts at the top
- **Aircraft type filter** — 767-301ER / A321 / ERJ142 / CRJ900
- Distance category badges (Task 18 CASE logic visualised)

### Revenue Tab
- **Per-class revenue cards** — Business, Economy, Economy Plus, First Class
- **Max price per class** — Task 11 window function (`MAX() OVER PARTITION BY`) visualised
- **Revenue by brand** — ticket count and total revenue per airline
- **Complimentary services table** — Task 19 function result for all ticket records (Yes / No)

### SQL Tasks Tab
- All **20 tasks** as expandable accordion cards
- Each card shows task number, title, description, and a syntax-highlighted SQL snippet
- Keywords highlighted in green, functions in amber

---

## 📝 SQL Tasks Covered

| Task | Topic | Key Concept |
|---|---|---|
| 1 | ER Diagram | Schema design and relationships |
| 2 | route_details table | `CHECK` and `UNIQUE` constraints |
| 3 | Passengers on routes 1–25 | `BETWEEN` operator |
| 4 | Business class revenue | `COUNT`, `SUM`, `WHERE` |
| 5 | Full customer names | `CONCAT` |
| 6 | Registered + booked customers | `INNER JOIN` |
| 7 | Emirates customers | `JOIN` + `WHERE brand =` |
| 8 | Economy Plus passengers | `GROUP BY` + `HAVING` |
| 9 | Revenue threshold check | `IF` clause |
| 10 | Create user + grant access | `CREATE USER`, `GRANT` |
| 11 | Max price per class | `MAX() OVER (PARTITION BY)` window function |
| 12 | Index on route_id | `CREATE INDEX` |
| 13 | Query execution plan | `EXPLAIN` |
| 14 | Spending subtotals | `GROUP BY ... WITH ROLLUP` |
| 15 | Business class view | `CREATE OR REPLACE VIEW` |
| 16 | Passengers by route range | Stored procedure with `IN` params + error handler |
| 17 | Long distance routes | Stored procedure — `distance_miles > 2000` |
| 18 | Distance categorisation | Stored procedure + `CASE` expression |
| 19 | Complimentary services | Stored function (`DETERMINISTIC`) |
| 20 | First Scott customer | `CURSOR` — `FETCH`, `OPEN`, `CLOSE` |

---

## 🔐 SQL Security Features Implemented

- **`CHECK` constraints** on `route_details` — ensures only valid flight numbers and distances are inserted
- **`UNIQUE` constraint** on `route_id` — prevents duplicate route entries
- **JWT-ready structure** — user model in schema can extend to authentication
- **Parameterised stored procedures** — prevents SQL injection in dynamic queries
- **Role-based user creation** — Task 10 creates a restricted `cargo_analyst` user with minimal privileges

---

## 🧪 Sample Queries

```sql
-- Task 11: Max ticket price per class using window function
SELECT DISTINCT
  class_id,
  price_per_ticket,
  MAX(price_per_ticket) OVER (PARTITION BY class_id) AS max_price_in_class
FROM ticket_details
ORDER BY class_id;

-- Task 18: Categorise routes by distance
SELECT route_id, origin_airport, destination_airport, distance_miles,
  CASE
    WHEN distance_miles <= 2000 THEN 'Short Distance Travel (SDT)'
    WHEN distance_miles <= 6500 THEN 'Intermediate Distance Travel (IDT)'
    ELSE 'Long Distance Travel (LDT)'
  END AS distance_category
FROM routes
ORDER BY distance_miles;

-- Task 20: Cursor to find first customer with last name ending in Scott
CALL GetFirstScottCustomer();
```

---

## 🌐 Deployment

### Frontend — Vercel

```bash
npm run build
# Deploy the build/ folder to Vercel
```

### Frontend — Netlify

```bash
npm run build
# Drag and drop build/ into Netlify dashboard
# Or connect the GitHub repo with build command: npm run build
```

No backend server is required — the React app is fully static.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/add-new-chart

# 3. Commit your changes
git commit -m 'Add aircraft utilisation chart'

# 4. Push to the branch
git push origin feature/add-new-chart

# 5. Open a Pull Request
```

Please ensure any new SQL task visualisations are also added to `src/data.js` with matching descriptions and SQL snippets.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- **MySQL** — for the robust relational database powering all 20 task queries
- **React** — for the component-driven UI framework
- **IBM Plex Mono & Sora** — Google Fonts used for the dashboard typography
- SQL course instructors and the open-source database community for the dataset inspiration

---

> Built as a SQL Course-End Project — demonstrating DDL, DML, joins, aggregation, window functions, stored procedures, functions, cursors, views, and indexes across a real-world airline cargo schema.
