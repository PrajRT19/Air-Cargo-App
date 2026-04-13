import React, { useState } from 'react';
import Overview from './components/Overview';
import Passengers from './components/Passengers';
import Routes from './components/Routes';
import Revenue from './components/Revenue';
import SqlTasks from './components/SqlTasks';
import s from './App.module.css';

const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'passengers', label: 'Passengers' },
  { id: 'routes',     label: 'Routes' },
  { id: 'revenue',    label: 'Revenue' },
  { id: 'tasks',      label: 'SQL Tasks' },
];

const PAGES = { overview: Overview, passengers: Passengers, routes: Routes, revenue: Revenue, tasks: SqlTasks };

export default function App() {
  const [tab, setTab] = useState('overview');
  const Page = PAGES[tab];

  return (
    <div className={s.app}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <div className={s.logo}>
            <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
            </svg>
          </div>
          <div>
            <div className={s.title}>Air Cargo Analysis</div>
            <div className={s.subtitle}>SQL Course-End Project · 20 Tasks Completed</div>
          </div>
        </div>
        <nav className={s.nav}>
          {TABS.map(t => (
            <button key={t.id} className={s.tab + (tab === t.id ? ' ' + s.active : '')} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={s.main}>
        <Page />
      </main>
    </div>
  );
}
