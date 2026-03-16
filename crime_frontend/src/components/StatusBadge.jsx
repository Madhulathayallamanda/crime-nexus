import React from 'react';
const MAP = {
  OPEN:{cls:'red',label:'Open'}, PENDING:{cls:'amber',label:'Pending'},
  IN_PROGRESS:{cls:'amber',label:'In Progress'},
  UNDER_INVESTIGATION:{cls:'purple',label:'Under Investigation'},
  CLOSED:{cls:'green',label:'Closed'}, RESOLVED:{cls:'teal',label:'Resolved'},
};
export default function StatusBadge({ status }) {
  const key = (status||'').toUpperCase().replace(/ /g,'_');
  const c = MAP[key] || { cls:'gray', label: status || '—' };
  return <span className={`badge ${c.cls}`}>{c.label}</span>;
}
