import React, { useState, useEffect } from 'react';
import OPTicket from './components/OPTicket';
import Footer from './components/Footer';

export default function App() {
  const [step, setStep] = useState('HOME'); // 'HOME', 'PORTAL', 'PAYMENT', 'SUCCESS', 'QUEUE'
  const [formData, setFormData] = useState({
    patientName: '',
    uhid: '',
    district: 'Thiruvananthapuram',
    hospital: 'General Hospital Thiruvananthapuram',
    department: 'General Medicine',
    appointmentDate: new Date().toISOString().split('T')[0],
    timeSlot: '09:00 AM - 10:00 AM'
  });
  const [bookedTicket, setBookedTicket] = useState(null);
  const [queueList, setQueueList] = useState([]);
  const [loadingQueue, setLoadingQueue] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.uhid) {
      alert('Please fill in Patient Name and UHID.');
      return;
    }
    setStep('PAYMENT');
  };

  const handleCompletePayment = async () => {
    try {
      const payload = {
        patientName: formData.patientName || 'Anna',
        uhid: formData.uhid || 'KL-2026-042',
        district: formData.district || 'Ernakulam',
        hospital: formData.hospital || 'General Hospital Ernakulam',
        department: formData.department || 'General Medicine',
        appointmentDate: formData.appointmentDate || '2026-09-25',
        timeSlot: formData.timeSlot || '10:00 AM - 11:00 AM',
        paymentStatus: 'PAID',
        amountPaid: '₹20'
      };

      const response = await fetch('http://127.0.0.1:3000/api/tickets/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setBookedTicket(data);
      setStep('SUCCESS'); 
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Failed to connect to backend server. Ensure backend terminal is running.');
    }
  };

  const fetchQueue = async () => {
    setLoadingQueue(true);
    try {
      const res = await fetch('http://127.0.0.1:3000/api/tickets/queue');
      const data = await res.json();
      setQueueList(data);
    } catch (err) {
      console.error('Queue fetch error:', err);
      alert('Could not fetch queue from backend.');
    } finally {
      setLoadingQueue(false);
    }
  };

  useEffect(() => {
    if (step === 'QUEUE') {
      fetchQueue();
    }
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        {/* Header */}
        <header className="bg-emerald-800 text-white p-4 shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">eHealth Kerala OP Ticketing System</h1>
            <p className="text-xs text-emerald-200">Department of Health Services, Govt. of Kerala</p>
          </div>
          <div className="space-x-2">
            <button 
              onClick={() => setStep('HOME')} 
              className={`px-3 py-1 rounded text-sm ${step === 'HOME' ? 'bg-emerald-900 font-bold' : 'hover:bg-emerald-700'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setStep('PORTAL')} 
              className={`px-3 py-1 rounded text-sm ${['PORTAL', 'PAYMENT', 'SUCCESS'].includes(step) ? 'bg-emerald-900 font-bold' : 'hover:bg-emerald-700'}`}
            >
              Book OP Ticket
            </button>
            <button 
              onClick={() => setStep('QUEUE')} 
              className={`px-3 py-1 rounded text-sm ${step === 'QUEUE' ? 'bg-emerald-900 font-bold' : 'hover:bg-emerald-700'}`}
            >
              Live Queue Status
            </button>
          </div>
        </header>

        <main className="max-w-3xl mx-auto p-6">
          {/* STEP: HOME with Background Photo */}
          {step === 'HOME' && (
            <div 
              className="rounded-xl shadow-xl p-10 text-center space-y-6 mt-6 bg-cover bg-center relative overflow-hidden border border-emerald-100"
              style={{ 
                
              }}
            >
              <div className="absolute inset-0 bg-white/92"></div>

              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl font-extrabold text-emerald-900">Welcome to Digital Outpatient Ticketing</h2>
                <p className="text-slate-700 max-w-xl mx-auto text-base">
                  Streamlining public healthcare access across Kerala. Avoid long physical queues by booking your time-slot controlled OP token in advance for a nominal fee of ₹20.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                  <button
                    onClick={() => setStep('PORTAL')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
                  >
                    Book OP Ticket Now
                  </button>
                  <button
                    onClick={() => setStep('QUEUE')}
                    className="bg-white hover:bg-slate-100 text-emerald-800 border border-emerald-700 font-bold px-6 py-3 rounded-lg shadow-lg transition"
                  >
                    View Live Queue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP: PORTAL (Form) */}
          {step === 'PORTAL' && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <h2 className="text-xl font-bold text-emerald-800 mb-4 border-b pb-2">Patient Registration & Slot Booking</h2>
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Patient Name</label>
                    <input 
                      type="text" 
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">UHID (Unique Health ID)</label>
                    <input 
                      type="text" 
                      name="uhid"
                      value={formData.uhid}
                      onChange={handleInputChange}
                      placeholder="e.g. KL-2026-001"
                      required
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">District</label>
                    <select 
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                      <option value="Ernakulam">Ernakulam</option>
                      <option value="Kozhikode">Kozhikode</option>
                      <option value="Thrissur">Thrissur</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Hospital</label>
                    <select 
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="General Hospital Ernakulam">General Hospital Ernakulam</option>
                      <option value="Medical College Hospital TVM">Medical College Hospital TVM</option>
                      <option value="District Hospital Kozhikode">District Hospital Kozhikode</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Department</label>
                    <select 
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    >
                      <option value="General Medicine">General Medicine</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                      <option value="Dermatology">Dermatology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Appointment Date</label>
                    <input 
                      type="date" 
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Time Slot (Max 5 Patients per Slot)</label>
                  <select 
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleInputChange}
                    className="w-full border rounded p-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                    <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                    <option value="02:00 PM - 03:00 PM">02:00 PM - 03:00 PM</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow transition mt-4"
                >
                  Proceed to Payment (₹20)
                </button>
              </form>
            </div>
          )}

          {/* STEP: PAYMENT */}
          {step === 'PAYMENT' && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-4 max-w-md mx-auto space-y-4">
              <h2 className="text-xl font-bold text-emerald-800 border-b pb-2">Simulated Payment Gateway</h2>
              <div className="bg-emerald-50 p-4 rounded border border-emerald-200 text-sm space-y-1">
                <p><strong>Patient:</strong> {formData.patientName}</p>
                <p><strong>Department:</strong> {formData.department}</p>
                <p><strong>Slot:</strong> {formData.timeSlot}</p>
                <p className="text-emerald-700 font-bold text-base pt-2">Amount: ₹20.00</p>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold">Select Payment Mode</label>
                <div className="border p-3 rounded flex items-center gap-3 bg-slate-50 cursor-pointer">
                  <input type="radio" name="pay" defaultChecked />
                  <span>UPI / GPay / PhonePe</span>
                </div>
                <div className="border p-3 rounded flex items-center gap-3 bg-slate-50 cursor-pointer">
                  <input type="radio" name="pay" />
                  <span>Debit / Credit Card</span>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setStep('PORTAL')}
                  className="w-1/2 bg-slate-300 hover:bg-slate-400 font-bold py-3 rounded-lg"
                >
                  Back
                </button>
                <button 
                  type="button"
                  onClick={handleCompletePayment}
                  className="w-1/2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow"
                >
                  Pay ₹20 & Confirm
                </button>
              </div>
            </div>
          )}

          {/* STEP: SUCCESS (Show Ticket & PDF Download) */}
          {step === 'SUCCESS' && (
            <div>
              <div className="bg-emerald-100 border border-emerald-400 text-emerald-800 p-4 rounded-lg mb-4 text-center font-bold">
                Payment Successful! OP Ticket Booked & Saved.
              </div>
              {bookedTicket && <OPTicket ticket={bookedTicket} />}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setStep('QUEUE')}
                  className="text-emerald-700 underline font-semibold hover:text-emerald-900"
                >
                  View Live Queue Status &rarr;
                </button>
              </div>
            </div>
          )}

          {/* STEP: QUEUE */}
          {step === 'QUEUE' && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-4">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-emerald-800">Live Hospital Queue Status</h2>
                <button 
                  type="button"
                  onClick={fetchQueue}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-sm px-3 py-1 rounded shadow"
                >
                  Refresh Queue
                </button>
              </div>
              {loadingQueue ? (
                <p className="text-center py-6 text-slate-500">Loading queue data...</p>
              ) : queueList.length === 0 ? (
                <p className="text-center py-6 text-slate-500">No active bookings found in the queue yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-emerald-800 text-white">
                        <th className="p-3">Token No</th>
                        <th className="p-3">Patient Name</th>
                        <th className="p-3">Department</th>
                        <th className="p-3">Time Slot</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queueList.map((item, idx) => (
                        <tr key={idx} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-bold text-emerald-700">{item.tokenNo}</td>
                          <td className="p-3">{item.patientName}</td>
                          <td className="p-3">{item.department}</td>
                          <td className="p-3">{item.timeSlot}</td>
                          <td className="p-3">
                            <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded font-bold">
                              {item.status || 'CONFIRMED'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}