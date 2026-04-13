import React, { useState } from 'react';
import { routes } from '../data';
import Badge from './Badge';
import s from './TablePage.module.css';

const AIRCRAFT = ['All', '767-301ER', 'A321', 'ERJ142', 'CRJ900'];

function distCat(d) {
  if (d <= 2000) return 'SDT';
  if (d <= 6500) return 'IDT';
  return 'LDT';
}

export default function Routes() {
  const [ac, setAc] = useState('All');
  const filtered = routes.filter(r => ac === 'All' || r.ac === ac);

  const sdt = routes.filter(r => r.dist <= 2000).length;
  const idt = routes.filter(r => r.dist > 2000 && r.dist <= 6500).length;
  const ldt = routes.filter(r => r.dist > 6500).length;

  return (
    <div>
      <div className={s.metricRow}>
        <div className={s.miniMetric}><div className={s.mmLabel}>Short Distance ≤2000 mi</div><div className={s.mmVal} style={{ color: '#378ADD' }}>{sdt}</div></div>
        <div className={s.miniMetric}><div className={s.mmLabel}>Intermediate 2001–6500 mi</div><div className={s.mmVal} style={{ color: '#EF9F27' }}>{idt}</div></div>
        <div className={s.miniMetric}><div className={s.mmLabel}>Long Distance &gt;6500 mi</div><div className={s.mmVal} style={{ color: '#D4537E' }}>{ldt}</div></div>
      </div>
      <div className={s.controls}>
        <div className={s.filters}>
          {AIRCRAFT.map(a => (
            <button key={a} className={s.filterBtn + (ac === a ? ' ' + s.active : '')} onClick={() => setAc(a)}>{a}</button>
          ))}
        </div>
      </div>
      <div className={s.count}>{filtered.length} routes</div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Route ID</th><th>Flight #</th><th>Origin</th><th>Destination</th>
              <th>Aircraft</th><th>Distance</th><th>Category</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id}>
                <td style={{ color: '#8b949e' }}>{r.id}</td>
                <td><code style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: '#8b949e' }}>{r.flt}</code></td>
                <td><strong style={{ color: '#e6edf3' }}>{r.orig}</strong></td>
                <td><strong style={{ color: '#e6edf3' }}>{r.dest}</strong></td>
                <td style={{ fontSize: 12, color: '#8b949e' }}>{r.ac}</td>
                <td style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}>{r.dist.toLocaleString()} mi</td>
                <td><Badge type={distCat(r.dist)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
