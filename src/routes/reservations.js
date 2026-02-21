const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET/api/reservations */
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

/* POST/api/reservations */
router.post('/', async (req, res) => {
  const { user_id, resource_id, start_time, end_time, purpose } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO reservations (user_id, resource_id, start_time, end_time, purpose) VALUES (?, ?, ?, ?, ?)',
      [user_id, resource_id, start_time, end_time, purpose]
    );

    res.status(201).json({
      message: 'Reservation created',
      reservation_id: result.insertId
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

module.exports = router;