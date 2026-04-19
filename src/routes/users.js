const bcrypt = require('bcrypt');
const validate = require('../middleware/validateRequest');
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

/* GET /api/users — only logged-in users */
router.get('/', auth, async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT user_id, full_name, email, role FROM users');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
});

/* POST /api/users */
router.post('/', auth, validate(['full_name', 'email', 'password']), async (req, res, next) => {
    try {
      const { full_name, email, password, role } = req.body;

      // Validation errors
      if (!full_name) return res.status(400).json({ error: 'full_name is required' });
      if (!email) return res.status(400).json({ error: 'email is required' });
      if (!password) return res.status(400).json({ error: 'password is required' });

      const hashedPassword = await bcrypt.hash(password, 10);

      const [result] = await db.query(
        'INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)',
        [full_name, email, hashedPassword, role || 'user']
      );

      res.status(201).json({
        message: 'User created',
        user_id: result.insertId
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;