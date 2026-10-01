import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uhid: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String 
  },
  age: { 
    type: Number 
  },
  gender: { 
    type: String 
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);