import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar */}
      <header className="bg-teal-700 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-wide">Kerala eHealth Portal</h1>
          <nav className="space-x-6">
            <Link to="/" className="hover:text-teal-200 transition font-medium">Home</Link>
            <Link to="/book-ticket" className="bg-teal-800 hover:bg-teal-900 px-4 py-2 rounded-md transition font-medium">Book OP Ticket</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-10 text-center mb-10">
          <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
            Digital Outpatient Booking System
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-8">
            Skip long queues at government hospitals across Kerala. Book your OP ticket online with slot-based token limits and instant digital payment receipt generation.
          </p>
          <Link
            to="/book-ticket"
            className="bg-teal-700 hover:bg-teal-800 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md transition inline-block"
          >
            Book OP Ticket Now
          </Link>
        </section>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-teal-700 mb-2">1. Slot Capacity Limits</h3>
            <p className="text-slate-600 text-sm">
              Strict limit of 5 tokens per time slot to prevent crowding and ensure timely consultation.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-teal-700 mb-2">2. Integrated UPI Payment</h3>
            <p className="text-slate-600 text-sm">
              Pay the nominal OP registration fee securely online via UPI, Card, or Netbanking.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-teal-700 mb-2">3. Instant PDF Pass</h3>
            <p className="text-slate-600 text-sm">
              Download your verified OP token PDF pass immediately after payment confirmation.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;