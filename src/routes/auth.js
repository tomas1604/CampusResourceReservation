const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// REGISTER
router.post('/register', async (req, res, next) => {
  const { full_name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
      [full_name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: 'User registered',
      user_id: result.insertId
    });

  } catch (error) {
    next(error);
  }
});

// LOGIN
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      'your_secret_key',
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    next(error);
  }
});

module.exports = router;