import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Patient/User Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, district } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already registered' });

    const count = await User.countDocuments();
    const uhid = `KL-${20260000 + count + 1}`;

    const user = new User({ name, email, password, district, uhid });
    await user.save();

    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;