import React from 'react';
import { Hospital, User, ShieldAlert } from 'lucide-react';

export default function Navbar({ activePortal, setActivePortal }) {
  return (
    <header className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-600 rounded-xl text-white">
          <Hospital className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg">eHealth Portal</h1>
          <p className="text-xs text-emerald-400">Government Health System</p>
        </div>
      </div>

      <div className="flex bg-slate-800 p-1 rounded-xl">
        <button
          onClick={() => setActivePortal('patient')}
          className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 ${
            activePortal === 'patient' ? 'bg-emerald-600 text-white' : 'text-slate-400'
          }`}
        >
          <User className="w-4 h-4" /> Citizen Portal
        </button>
        <button
          onClick={() => setActivePortal('staff')}
          className={`px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-2 ${
            activePortal === 'staff' ? 'bg-emerald-600 text-white' : 'text-slate-400'
          }`}
        >
          <ShieldAlert className="w-4 h-4" /> Doctor & Staff Desk
        </button>
      </div>
    </header>
  );
}