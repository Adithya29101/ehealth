import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, CheckCircle2 } from 'lucide-react';
import HospitalSelector from './HospitalSelector';
import { DEPARTMENTS, TIME_SLOTS } from '../data/districtsAndHospitals';
import API from '../api/axiosInstance';

export default function AdvanceBooking({ onBookingComplete }) {
  const [district, setDistrict] = useState('Thiruvananthapuram');
  const [hospital, setHospital] = useState('General Hospital, Trivandrum');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [bookingDate, setBookingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [patientName, setPatientName] = useState('');
  const [uhid, setUhid] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName || !uhid || !bookingDate) return;

    setLoading(true);
    try {
      const response = await API.post('/tickets', {
        name: patientName,
        uhid,
        district,
        hospital,
        department,
        date: bookingDate,
        timeSlot,
      });

      onBookingComplete(response.data);
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Failed to connect to backend server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border max-w-2xl mx-auto space-y-6">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <Calendar className="w-5 h-5 text-emerald-600" /> Advance OPD Appointment Booking
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <HospitalSelector
          selectedDistrict={district}
          setSelectedDistrict={setDistrict}
          selectedHospital={hospital}
          setSelectedHospital={setHospital}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="p-2.5 text-sm border rounded-lg"
          />
          <input
            type="text"
            required
            placeholder="UHID Number"
            value={uhid}
            onChange={(e) => setUhid(e.target.value)}
            className="p-2.5 text-sm border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className="p-2.5 text-sm border rounded-lg bg-white">
            {DEPARTMENTS.map((dept) => <option key={dept} value={dept}>{dept}</option>)}
          </select>
          <input
            type="date"
            required
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="p-2.5 text-sm border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {TIME_SLOTS.map((slot) => (
            <button
              type="button"
              key={slot}
              onClick={() => setTimeSlot(slot)}
              className={`p-2 text-xs border rounded-lg ${timeSlot === slot ? 'bg-emerald-600 text-white' : 'bg-white'}`}
            >
              {slot}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 disabled:opacity-50"
        >
          <CheckCircle2 className="w-5 h-5" /> {loading ? 'Saving...' : 'Book Ticket'}
        </button>
      </form>
    </div>
  );
}