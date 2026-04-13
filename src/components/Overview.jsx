import React, { useEffect, useRef } from 'react';
import { tickets, passengers, routes } from '../data';
import s from './Overview.module.css';

const brandColors = {
  'Emirates': '#1D9E75', 'Qatar Airways': '#378ADD',
  'Jet Airways': '#BA7517', 'British Airways': '#D4537E'
};
const clsColors = {
  'Bussiness': '#1D9E75', 'Economy': '#378ADD',
  'Economy Plus': '#EF9F27', 'First Class': '#D4537E'
};
const fmt = n => '$' + n.toLocaleString();

export default function Overview() {
  const canvasRef = useRef(null);
  const totalRev = tickets.reduce((s, t) => s + t.price * t.n, 0);

  const brandMap = {};
  tickets.forEach(t => {
    if (!brandMap[t.brand]) brandMap[t.brand] = 0;
    brandMap[t.brand] += t.price * t.n;
  });
  const maxRev = Math.max(...Object.values(brandMap));

  const clsMap = {};
  passengers.forEach(p => { clsMap[p.cls] = (clsMap[p.cls] || 0) + 1; });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 80, cy = 80, r = 68, inner = 38;
    ctx.clearRect(0, 0, 160, 160);
    let start = -Math.PI / 2;
    const total = passengers.length;
    Object.entries(clsMap).forEach(([cls, cnt]) => {
      const slice = (cnt / total) * 2 * Math.PI;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, start + slice);
      ctx.closePath();
      ctx.fillStyle = clsColors[cls] || '#888'; ctx.fill();
      ctx.strokeStyle = '#0d1117'; ctx.lineWidth = 2; ctx.stroke();
      start += slice;
    });
    ctx.beginPath(); ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.fillStyle = '#161b22'; ctx.fill();
    ctx.fillStyle = '#e6edf3'; ctx.font = '500 13px Sora, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(total, cx, cy - 7);
    ctx.fillStyle = '#8b949e'; ctx.font = '11px Sora, sans-serif';
    ctx.fillText('flights', cx, cy + 9);
  }, []);

  const metrics = [
    { label: 'Total Customers', val: 40, sub: 'Registered in DB' },
    { label: 'Active Routes', val: 49, sub: 'Across 4 aircraft types' },
    { label: 'Flight Records', val: passengers.length, sub: 'Passengers on flights' },
    { label: 'Total Revenue', val: fmt(totalRev), sub: totalRev > 10000 ? '✓ Crossed $10,000 threshold' : 'Below $10,000' },
  ];

  return (
    <div className={s.wrap}>
      <div className={s.metrics}>
        {metrics.map(m => (
          <div key={m.label} className={s.metric}>
            <div className={s.metricLabel}>{m.label}</div>
            <div className={s.metricVal}>{m.val}</div>
            <div className={s.metricSub}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className={s.grid2}>
        <div className={s.card}>
          <div className={s.cardTitle}>Revenue by airline brand</div>
          {Object.entries(brandMap).sort((a, b) => b[1] - a[1]).map(([brand, rev]) => (
            <div key={brand} className={s.barRow}>
              <div className={s.barMeta}>
                <span>{brand}</span><span>{fmt(rev)}</span>
              </div>
              <div className={s.barTrack}>
                <div className={s.barFill} style={{
                  width: `${Math.round(rev / maxRev * 100)}%`,
                  background: brandColors[brand] || '#888'
                }} />
              </div>
            </div>
          ))}
        </div>

        <div className={s.card}>
          <div className={s.cardTitle}>Class distribution</div>
          <div className={s.donutWrap}>
            <canvas ref={canvasRef} width={160} height={160} />
            <div className={s.legend}>
              {Object.entries(clsMap).map(([cls, cnt]) => (
                <div key={cls} className={s.legendRow}>
                  <span className={s.dot} style={{ background: clsColors[cls] }} />
                  <span>{cls === 'Bussiness' ? 'Business' : cls}</span>
                  <span className={s.legendVal}>{cnt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={s.card} style={{ marginBottom: 16 }}>
        <div className={s.cardTitle}>Entity Relationship Diagram</div>
        <div className={s.er}>
          {[
            { name: 'customer', fields: [{ n: 'customer_id', t: 'PK' }, { n: 'first_name' }, { n: 'last_name' }, { n: 'date_of_birth' }, { n: 'gender' }] },
            { name: 'passengers_on_flights', fields: [{ n: 'customer_id', t: 'FK' }, { n: 'route_id', t: 'FK' }, { n: 'aircraft_id' }, { n: 'seat_num' }, { n: 'class_id' }] },
            { name: 'routes', fields: [{ n: 'route_id', t: 'PK' }, { n: 'flight_num' }, { n: 'origin_airport' }, { n: 'destination_airport' }, { n: 'distance_miles' }] },
            { name: 'ticket_details', fields: [{ n: 'customer_id', t: 'FK' }, { n: 'aircraft_id' }, { n: 'class_id' }, { n: 'price_per_ticket' }, { n: 'brand' }] },
          ].map((tbl, i) => (
            <React.Fragment key={tbl.name}>
              {i > 0 && i < 3 && <div className={s.erArrow}>→</div>}
              {i === 3 && <div className={s.erArrowDown}>↕</div>}
              <div className={s.erTable}>
                <div className={s.erName}>{tbl.name}</div>
                {tbl.fields.map(f => (
                  <div key={f.n} className={s.erField + (f.t === 'PK' ? ' ' + s.pk : f.t === 'FK' ? ' ' + s.fk : '')}>
                    {f.t && <span className={s.badge}>{f.t}</span>}{f.n}
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={s.card}>
        <div className={s.cardTitle}>Stored procedures &amp; functions (Tasks 16–20)</div>
        <div className={s.procList}>
          {[
            { n: 16, name: 'GetPassengersByRouteRange', desc: 'Accepts IN params, returns passengers in route range with SQLEXCEPTION handler' },
            { n: 17, name: 'GetLongDistanceRoutes', desc: 'Returns all routes with distance_miles > 2,000, ordered descending' },
            { n: 18, name: 'CategorizeRouteDistance', desc: 'CASE expression classifies routes as SDT / IDT / LDT' },
            { n: 19, name: 'CheckComplimentaryServices', desc: 'DETERMINISTIC function — returns Yes for Business & Economy Plus, No otherwise' },
            { n: 20, name: 'GetFirstScottCustomer', desc: 'CURSOR fetches first customer whose last name ends with Scott' },
          ].map(p => (
            <div key={p.n} className={s.procItem}>
              <div className={s.procNum}>{p.n}</div>
              <div>
                <div className={s.procName}>{p.name}</div>
                <div className={s.procDesc}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
