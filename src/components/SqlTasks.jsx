import React, { useState } from 'react';
import { tasks } from '../data';
import s from './SqlTasks.module.css';

function highlight(sql) {
  const keywords = ['SELECT','FROM','WHERE','GROUP BY','HAVING','ORDER BY','CREATE','INSERT','UPDATE','DELETE','TABLE','INDEX','VIEW','PROCEDURE','FUNCTION','DELIMITER','BEGIN','END','DECLARE','CURSOR','OPEN','FETCH','CLOSE','IF','THEN','ELSE','CASE','WHEN','GRANT','FLUSH','EXPLAIN','WITH','ROLLUP','OVER','PARTITION BY','INNER JOIN','JOIN','ON','IN','BETWEEN','LIKE','AND','OR','NOT','AS','DISTINCT','REPLACE','DROP','USE','SET','RETURN','RETURNS','DETERMINISTIC','CALL'];
  const fns = ['COUNT','SUM','MAX','MIN','AVG','CONCAT','IF','COALESCE'];
  let out = sql;
  keywords.forEach(k => { out = out.replace(new RegExp(`\\b(${k})\\b`, 'g'), `<span class="kw">$1</span>`); });
  fns.forEach(f => { out = out.replace(new RegExp(`\\b(${f})\\b`, 'g'), `<span class="fn">$1</span>`); });
  return out;
}

export default function SqlTasks() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className={s.wrap}>
      {tasks.map(t => (
        <div key={t.n} className={s.taskCard + (expanded === t.n ? ' ' + s.open : '')}
          onClick={() => setExpanded(expanded === t.n ? null : t.n)}>
          <div className={s.taskHeader}>
            <span className={s.taskNum}>Task {t.n}</span>
            <span className={s.taskTitle}>{t.title}</span>
            <span className={s.chevron}>{expanded === t.n ? '▲' : '▼'}</span>
          </div>
          {expanded === t.n && (
            <div className={s.taskBody}>
              <p className={s.taskDesc}>{t.desc}</p>
              <pre className={s.code} dangerouslySetInnerHTML={{ __html: highlight(t.sql) }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
