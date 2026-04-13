import React from 'react';
import { tickets } from '../data';
import Badge from './Badge';
import s from './TablePage.module.css';
import rs from './Revenue.module.css';

const fmt = n => '$' + n.toLocaleString();
const CLASSES = ['Bussiness', 'Economy', 'Economy Plus', 'First Class'];
const CLS_LABELS = { 'Bussiness': 'Business', 'Economy': 'Economy', 'Economy Plus': 'Economy Plus', 'First Class': 'First Class' };

export default function Revenue() {
  const clsStats = {};
  CLASSES.forEach(c => { clsStats[c] = { rev: 0, n: 0, max: 0, maxBrand: '' }; });
  tickets.forEach(t => {
    if (clsStats[t.cls]) {
      clsStats[t.cls].rev += t.price * t.n;
      clsStats[t.cls].n += t.n;
      if (t.price > clsStats[t.cls].max) { clsStats[t.cls].max = t.price; clsStats[t.cls].maxBrand = t.brand; }
    }
  });

  const brandMap = {};
  tickets.forEach(t => {
    if (!brandMap[t.brand]) brandMap[t.brand] = { n: 0, rev: 0 };
    brandMap[t.brand].n += t.n; brandMap[t.brand].rev += t.price * t.n;
  });

  const totalRev = tickets.reduce((s, t) => s + t.price * t.n, 0);

  return (
    <div>
      <div className={rs.clsGrid}>
        {CLASSES.map(c => (
          <div key={c} className={rs.clsCard}>
            <div className={rs.clsLabel}>{CLS_LABELS[c]}</div>
            <div className={rs.clsRev}>{fmt(clsStats[c].rev)}</div>
            <div className={rs.clsSub}>{clsStats[c].n} tickets</div>
          </div>
        ))}
      </div>

      <div className={rs.grid2}>
        <div className={s.card}>
          <div className={s.cardTitle}>Max price per class — Task 11 (window function)</div>
          <table className={s.table} style={{ marginTop: 0 }}>
            <thead><tr><th>Class</th><th>Max Price</th><th>Brand</th></tr></thead>
            <tbody>
              {CLASSES.map(c => (
                <tr key={c}>
                  <td><Badge type={c} /></td>
                  <td style={{ fontWeight: 500, color: '#1D9E75', fontFamily: 'IBM Plex Mono', fontSize: 13 }}>{fmt(clsStats[c].max)}</td>
                  <td style={{ color: '#8b949e', fontSize: 12 }}>{clsStats[c].maxBrand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={s.card}>
          <div className={s.cardTitle}>Revenue by brand</div>
          <table className={s.table} style={{ marginTop: 0 }}>
            <thead><tr><th>Brand</th><th>Tickets</th><th>Revenue</th></tr></thead>
            <tbody>
              {Object.entries(brandMap).sort((a, b) => b[1].rev - a[1].rev).map(([brand, v]) => (
                <tr key={brand}>
                  <td style={{ fontWeight: 500, fontSize: 13 }}>{brand}</td>
                  <td>{v.n}</td>
                  <td style={{ color: '#1D9E75', fontWeight: 500, fontFamily: 'IBM Plex Mono', fontSize: 13 }}>{fmt(v.rev)}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '0.5px solid #30363d' }}>
                <td colSpan={2} style={{ fontWeight: 500 }}>Grand Total</td>
                <td style={{ color: '#EF9F27', fontWeight: 600, fontFamily: 'IBM Plex Mono', fontSize: 13 }}>{fmt(totalRev)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={s.card}>
        <div className={s.cardTitle}>Complimentary services eligibility — Task 19</div>
        <div className={s.tableWrap}>
          <table className={s.table} style={{ marginTop: 0 }}>
            <thead><tr><th>Customer ID</th><th>Class</th><th>Complimentary?</th><th>Purchase Date</th><th>Brand</th></tr></thead>
            <tbody>
              {tickets.map((t, i) => (
                <tr key={i}>
                  <td style={{ color: '#1D9E75', fontWeight: 500 }}>{t.cid}</td>
                  <td><Badge type={t.cls} /></td>
                  <td><Badge type={['Bussiness', 'Economy Plus'].includes(t.cls) ? 'Yes' : 'No'} /></td>
                  <td style={{ color: '#8b949e', fontSize: 12 }}>{t.date}</td>
                  <td style={{ color: '#8b949e', fontSize: 12 }}>{t.brand}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
