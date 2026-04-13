import React from 'react';

const config = {
  'Bussiness':    { bg: '#0F6E5620', color: '#1D9E75', label: 'Business' },
  'Economy':      { bg: '#185FA520', color: '#378ADD', label: 'Economy' },
  'Economy Plus': { bg: '#BA751720', color: '#EF9F27', label: 'Economy Plus' },
  'First Class':  { bg: '#D4537E20', color: '#D4537E', label: 'First Class' },
  'SDT':          { bg: '#185FA520', color: '#378ADD', label: 'SDT' },
  'IDT':          { bg: '#BA751720', color: '#EF9F27', label: 'IDT' },
  'LDT':          { bg: '#D4537E20', color: '#D4537E', label: 'LDT' },
  'Yes':          { bg: '#0F6E5620', color: '#1D9E75', label: 'Yes' },
  'No':           { bg: '#E24B4A20', color: '#E24B4A', label: 'No' },
};

export default function Badge({ type, custom }) {
  const c = config[type] || { bg: '#88888820', color: '#888', label: type };
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 9px',
      borderRadius: 5,
      fontSize: 11,
      fontWeight: 500,
      background: c.bg,
      color: c.color,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
      ...custom
    }}>{c.label}</span>
  );
}
