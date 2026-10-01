import React, { useState } from 'react';
import AdvanceBooking from '../components/AdvanceBooking';
import OPTicket from '../components/OPTicket';

export default function PatientPortal({ setPatients }) {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleBookingComplete = (newTicket) => {
    setPatients((prev) => [newTicket, ...prev]);
    setSelectedTicket(newTicket);
    setActiveTab('ticket');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('book')}
          className={`py-3 px-6 text-sm font-bold border-b-2 ${activeTab === 'book' ? 'border-emerald-600 text-emerald-600' : 'text-slate-500'}`}
        >
          Book Advance Token
        </button>
        {selectedTicket && (
          <button
            onClick={() => setActiveTab('ticket')}
            className={`py-3 px-6 text-sm font-bold border-b-2 ${activeTab === 'ticket' ? 'border-emerald-600 text-emerald-600' : 'text-slate-500'}`}
          >
            View Ticket
          </button>
        )}
      </div>

      {activeTab === 'book' ? (
        <AdvanceBooking onBookingComplete={handleBookingComplete} />
      ) : (
        selectedTicket && <OPTicket ticketData={selectedTicket} />
      )}
    </div>
  );
}