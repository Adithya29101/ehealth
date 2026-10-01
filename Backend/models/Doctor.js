import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  department: { 
    type: String, 
    required: true 
  },
  hospital: { 
    type: String, 
    required: true 
  },
  availableDays: [{ 
    type: String 
  }],
  availableSlots: [{ 
    type: String 
  }],
  isAvailable: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

export default mongoose.model('Doctor', doctorSchema);