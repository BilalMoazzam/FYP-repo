const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already exists' });

    const employee = new Employee({ name, email, password });
    await employee.save();
    res.status(201).json({ msg: 'Employee created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes/auth.js (or similar)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body
  // register logic here...
  res.json({ success: true, message: "User registered" })
})


// Login route

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ msg: 'Employee not found' });

    const isMatch = await employee.comparePassword(password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '30d' }
    );

    res.status(200).json({
      msg: 'Login successful',
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        role: employee.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
