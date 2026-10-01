import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Get doctors by hospital/department
router.get('/', async (req, res) => {
  try {
    const { district, hospital, department } = req.query;
    const query = {};

    if (district) query.district = district;
    if (hospital) query.hospital = hospital;
    if (department) query.department = department;

    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching doctors', error: error.message });
  }
});

// Add doctor schedule
router.post('/add', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: 'Error adding doctor', error: error.message });
  }
});

export default router;