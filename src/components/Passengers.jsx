import React, { useState } from 'react';
import { passengers } from '../data';
import Badge from './Badge';
import s from './TablePage.module.css';

const CLASSES = ['All', 'Bussiness', 'Economy', 'Economy Plus', 'First Class'];

export default function Passengers() {
  const [q, setQ] = useState('');
  const [cls, setCls] = useState('All');

  const filtered = passengers.filter(p => {
    const qMatch = q === '' || String(p.cid).includes(q) || p.seat.toLowerCase().includes(q.toLowerCase())
      || p.depart.toLowerCase().includes(q.toLowerCase()) || p.arrival.toLowerCase().includes(q.toLowerCase());
    return qMatch && (cls === 'All' || p.cls === cls);
  });

  return (
    <div>
      <div className={s.controls}>
        <input
          className={s.search}
          placeholder="Search by customer ID, seat or airport..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <div className={s.filters}>
          {CLASSES.map(c => (
            <button key={c} className={s.filterBtn + (cls === c ? ' ' + s.active : '')} onClick={() => setCls(c)}>
              {c === 'Bussiness' ? 'Business' : c}
            </button>
          ))}
        </div>
      </div>
      <div className={s.count}>{filtered.length} records</div>
      <div className={s.tableWrap}>
        <table className={s.table}>
          <thead>
            <tr>
              <th>Customer ID</th><th>Route</th><th>From → To</th>
              <th>Seat</th><th>Class</th><th>Aircraft</th>
              <th>Flight #</th><th>Travel Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i}>
                <td><strong style={{ color: '#1D9E75' }}>{p.cid}</strong></td>
                <td>{p.route}</td>
                <td><span className={s.airport}>{p.depart}</span> → <span className={s.airport}>{p.arrival}</span></td>
                <td><code style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: '#EF9F27' }}>{p.seat}</code></td>
                <td><Badge type={p.cls} /></td>
                <td style={{ color: '#6e7681', fontSize: 12 }}>{p.aircraft}</td>
                <td style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: '#6e7681' }}>{p.flt}</td>
                <td style={{ color: '#6e7681', fontSize: 12 }}>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
