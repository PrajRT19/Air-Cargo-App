# Air Cargo Analysis — React Dashboard

A full React dashboard for the Air Cargo SQL Course-End Project.
Covers all 20 SQL tasks across 5 tabs: Overview, Passengers, Routes, Revenue, and SQL Tasks.

---

## Prerequisites

Make sure you have **Node.js** installed (v16 or later):
👉 Download from https://nodejs.org

---

## How to Run in VS Code

### Step 1 — Open the project
```
File → Open Folder → select the `air-cargo-app` folder
```

### Step 2 — Open the terminal
```
Terminal → New Terminal   (or press Ctrl+` )
```

### Step 3 — Install dependencies
```bash
npm install
```
This downloads React and all required packages (takes ~1 min).

### Step 4 — Start the app
```bash
npm start
```
The app opens automatically at **http://localhost:3000**

---

## Project Structure

```
air-cargo-app/
├── public/
│   └── index.html
├── src/
│   ├── data.js                  ← all DB data (passengers, routes, tickets, tasks)
│   ├── index.js
│   ├── index.css
│   ├── App.jsx                  ← main layout + tab navigation
│   ├── App.module.css
│   └── components/
│       ├── Badge.jsx            ← reusable colored class badges
│       ├── Overview.jsx         ← metrics, ER diagram, brand revenue, donut chart
│       ├── Overview.module.css
│       ├── Passengers.jsx       ← searchable/filterable flight records table
│       ├── Routes.jsx           ← route table with SDT/IDT/LDT categories
│       ├── Revenue.jsx          ← revenue by class/brand, max prices, complimentary
│       ├── Revenue.module.css
│       ├── SqlTasks.jsx         ← all 20 SQL tasks with syntax-highlighted code
│       ├── SqlTasks.module.css
│       └── TablePage.module.css ← shared table/filter styles
└── package.json
```

---

## Features by Tab

| Tab | What it shows |
|-----|--------------|
| **Overview** | 4 key metrics, revenue bar chart, class distribution donut, ER diagram, stored procedures list |
| **Passengers** | All 50 flight records — searchable + filterable by class |
| **Routes** | All 49 routes — filterable by aircraft, SDT/IDT/LDT badges |
| **Revenue** | Per-class revenue, max prices (Task 11 window fn), brand table, complimentary services (Task 19) |
| **SQL Tasks** | All 20 tasks — click any card to expand description + syntax-highlighted SQL |
