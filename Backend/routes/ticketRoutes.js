import express from 'express';
import Ticket from '../models/Ticket.js'; // Adjust path if needed

const router = express.Router();
const SLOT_LIMIT = 5;

// POST: Book Ticket with Capacity Limit & Payment
router.post('/book', async (req, res) => {
  try {
    const { 
      patientName, 
      uhid, 
      district, 
      hospital, 
      department, 
      appointmentDate, 
      timeSlot,
      paymentStatus,
      amountPaid 
    } = req.body;

    // 1. Check current capacity for the selected slot on that date
    const bookedCount = await Ticket.countDocuments({
      appointmentDate,
      timeSlot,
      department
    });

    if (bookedCount >= SLOT_LIMIT) {
      return res.status(400).json({
        message: `Slot '${timeSlot}' is fully booked! (Limit: ${SLOT_LIMIT})`
      });
    }

    // 2. Create new ticket
    const newTicket = new Ticket({
      tokenNo: `TOK-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      uhid,
      district,
      hospital,
      department,
      appointmentDate,
      timeSlot,
      paymentStatus: paymentStatus || 'PAID',
      amountPaid: amountPaid || '₹20',
      status: 'CONFIRMED'
    });

    // Save if using MongoDB, or return response object directly
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Fetch Live Queue Status
router.get('/queue', async (req, res) => {
  try {
    const queue = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json(queue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;