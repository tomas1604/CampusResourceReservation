const validate = require('../middleware/validateRequest');
const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET/api/users */
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
      next(error);  
  }
});

/* POST/api/users */
router.post('/', validate(['full_name', 'email']), async (req, res, next) => {
  const { full_name, email, role } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO users (full_name, email, role) VALUES (?, ?, ?)',
      [full_name, email, role || 'student']
    );

    res.status(201).json({
      message: 'User created',
      user_id: result.insertId
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;