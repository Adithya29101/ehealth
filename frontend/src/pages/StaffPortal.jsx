import React from 'react';

export default function StaffPortal({ patients }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl border space-y-4">
      <h2 className="text-lg font-bold border-b pb-2">Doctor OPD Desk</h2>
      <div className="divide-y">
        {patients.map((p) => (
          <div key={p._id || p.ticketId} className="py-3 flex justify-between items-center text-xs">
            <div>
              <p className="font-bold">{p.name} ({p.uhid})</p>
              <p className="text-slate-500">{p.hospital} • {p.department}</p>
            </div>
            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border">
              {p.token}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}