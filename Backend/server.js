import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const ticketsDB = [];

app.get('/', (req, res) => {
  res.send('eHealth Kerala Backend is Active and Running!');
});

app.get('/api/tickets/queue', (req, res) => {
  res.status(200).json(ticketsDB);
});

app.post('/api/tickets/book', (req, res) => {
  try {
    const { 
      patientName, 
      uhid, 
      district, 
      hospital, 
      department, 
      appointmentDate, 
      timeSlot 
    } = req.body;

    const targetHospital = hospital || 'General Hospital Ernakulam';
    const targetDept = department || 'General Medicine';
    
    const departmentTickets = ticketsDB.filter(
      t => t.hospital === targetHospital && t.department === targetDept
    );

    const sequenceNumber = departmentTickets.length + 1;
    const formattedToken = `TOK-${sequenceNumber < 10 ? '0' + sequenceNumber : sequenceNumber}`;

    const newTicket = {
      _id: `TK-${Date.now()}`,
      tokenNo: formattedToken,
      patientName: patientName || 'Patient',
      uhid: uhid || 'KL-2026-001',
      district: district || 'Thiruvananthapuram',
      hospital: targetHospital,
      department: targetDept,
      appointmentDate: appointmentDate || '2026-09-25',
      timeSlot: timeSlot || '09:00 AM - 10:00 AM',
      paymentStatus: 'PAID',
      amountPaid: '₹20',
      status: 'CONFIRMED',
      createdAt: new Date()
    };

    ticketsDB.push(newTicket);
    console.log(`Ticket booked: ${newTicket.tokenNo} for ${targetDept} at ${targetHospital}`);
    
    return res.status(201).json(newTicket);
  } catch (err) {
    console.error('Backend booking crash:', err);
    return res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});