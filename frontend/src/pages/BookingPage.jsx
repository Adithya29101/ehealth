import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SLOT_LIMIT = 5; // Max 5 bookings per slot

const INITIAL_SLOTS = [
  { id: '09:00 AM - 10:00 AM', count: 0 },
  { id: '10:00 AM - 11:00 AM', count: 3 }, // Example pre-filled capacity
  { id: '11:00 AM - 12:00 PM', count: 5 }, // Fully booked example
  { id: '02:00 PM - 03:00 PM', count: 1 },
];

const BookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('FORM'); // 'FORM' | 'PAYMENT' | 'SUCCESS'
  const [slots, setSlots] = useState(INITIAL_SLOTS);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const [formData, setFormData] = useState({
    patientName: '',
    uhid: '',
    district: 'Thiruvananthapuram',
    department: 'General Medicine',
    appointmentDate: '',
    timeSlot: '',
  });

  const [createdTicket, setCreatedTicket] = useState(null);

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Step 1: Proceed to Payment if Slot Available
  const handleProceedToPayment = (e) => {
    e.preventDefault();

    const selectedSlotObj = slots.find((s) => s.id === formData.timeSlot);
    if (!selectedSlotObj) {
      alert('Please select a valid time slot.');
      return;
    }

    if (selectedSlotObj.count >= SLOT_LIMIT) {
      alert(`The slot "${formData.timeSlot}" is fully booked! Please select a different time slot.`);
      return;
    }

    setStep('PAYMENT');
  };

  // Step 2: Simulate Payment & Save Ticket
  const handleCompletePayment = async () => {
    // 1. Increment Slot Count
    const updatedSlots = slots.map((s) =>
      s.id === formData.timeSlot ? { ...s, count: s.count + 1 } : s
    );
    setSlots(updatedSlots);

    // 2. Build Final Ticket Data
    const ticketPayload = {
      ...formData,
      tokenNumber: `TOK-${Math.floor(1000 + Math.random() * 9000)}`,
      paymentStatus: 'PAID',
      amountPaid: '₹20',
      paidAt: new Date().toLocaleTimeString(),
    };

    try {
      // POST request to backend
      const res = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketPayload),
      });
      const data = await res.json();

      setCreatedTicket(data.ticket || ticketPayload);
      setStep('SUCCESS');
    } catch (error) {
      console.error('Error saving ticket:', error);
      // Fallback local display
      setCreatedTicket(ticketPayload);
      setStep('SUCCESS');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 flex items-center justify-center">
      <div className="bg-white max-w-xl w-full p-8 rounded-xl shadow-lg border border-slate-200">
        
        {/* STEP 1: BOOKING FORM */}
        {step === 'FORM' && (
          <form onSubmit={handleProceedToPayment} className="space-y-4">
            <h2 className="text-2xl font-bold text-teal-800 mb-4 border-b pb-2">
              OP Ticket Registration
            </h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Patient Name</label>
              <input
                type="text"
                name="patientName"
                required
                value={formData.patientName}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">UHID (Health ID)</label>
              <input
                type="text"
                name="uhid"
                required
                value={formData.uhid}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700">District</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-teal-600 outline-none"
                >
                  <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                  <option value="Ernakulam">Ernakulam</option>
                  <option value="Kozhikode">Kozhikode</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-teal-600 outline-none"
                >
                  <option value="General Medicine">General Medicine</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                required
                value={formData.appointmentDate}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-teal-600 outline-none"
              />
            </div>

            {/* LIMITED TIME SLOTS */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Select Time Slot (Max {SLOT_LIMIT} Patients/Slot)
              </label>
              <div className="grid grid-cols-1 gap-2">
                {slots.map((s) => {
                  const isFull = s.count >= SLOT_LIMIT;
                  return (
                    <label
                      key={s.id}
                      className={`flex justify-between items-center p-3 border rounded cursor-pointer transition ${
                        isFull
                          ? 'bg-red-50 border-red-200 opacity-60 cursor-not-allowed'
                          : formData.timeSlot === s.id
                          ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600'
                          : 'bg-white hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="timeSlot"
                          value={s.id}
                          disabled={isFull}
                          onChange={handleChange}
                          required
                        />
                        <span className="font-medium text-slate-800">{s.id}</span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${isFull ? 'bg-red-200 text-red-800' : 'bg-teal-100 text-teal-800'}`}>
                        {isFull ? 'FULL' : `${SLOT_LIMIT - s.count} seats left`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-lg shadow transition mt-4"
            >
              Proceed to Payment (₹20)
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT GATEWAY OPTION */}
        {step === 'PAYMENT' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-teal-800 border-b pb-2">
              Payment Gateway
            </h2>

            <div className="bg-slate-50 p-4 rounded border">
              <p className="text-sm text-slate-600">Registration Fee: <span className="font-bold text-slate-800">₹20.00</span></p>
              <p className="text-sm text-slate-600">Patient: <span className="font-bold text-slate-800">{formData.patientName}</span></p>
              <p className="text-sm text-slate-600">Slot: <span className="font-bold text-slate-800">{formData.timeSlot}</span></p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Choose Payment Option</label>
              <div className="space-y-2">
                {['UPI / Google Pay / PhonePe', 'Debit / Credit Card', 'Net Banking'].map((method) => (
                  <label key={method} className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="text-slate-800 font-medium">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep('FORM')}
                className="w-1/2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 rounded-lg"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleCompletePayment}
                className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow"
              >
                Pay ₹20 & Confirm
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TOKEN CONFIRMATION */}
        {step === 'SUCCESS' && createdTicket && (
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Booking Confirmed!</h2>
            
            <div id="ticket-container" className="bg-teal-50 border border-teal-200 p-6 rounded-lg text-left space-y-2 text-slate-800">
              <p><strong>Token No:</strong> <span className="text-teal-700 font-extrabold text-lg">{createdTicket.tokenNumber}</span></p>
              <p><strong>Patient Name:</strong> {createdTicket.patientName}</p>
              <p><strong>UHID:</strong> {createdTicket.uhid}</p>
              <p><strong>Department:</strong> {createdTicket.department}</p>
              <p><strong>Date & Slot:</strong> {createdTicket.appointmentDate} ({createdTicket.timeSlot})</p>
              <p><strong>Payment Status:</strong> <span className="text-emerald-700 font-bold">PAID (₹20)</span></p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/')}
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-lg"
              >
                Return Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingPage;