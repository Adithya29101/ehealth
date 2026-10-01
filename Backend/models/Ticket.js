import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema(
  {
    tokenNo: { type: String, required: true },
    patientName: { type: String, required: true },
    uhid: { type: String, required: true },
    district: { type: String, required: true },
    hospital: { type: String, required: true },
    department: { type: String, required: true },
    appointmentDate: { type: String, required: true },
    timeSlot: { type: String, required: true },
    paymentStatus: { type: String, default: 'PAID' },
    amountPaid: { type: String, default: '₹20' },
    status: { type: String, default: 'CONFIRMED' },
  },
  { timestamps: true }
);

export default mongoose.model('Ticket', ticketSchema);