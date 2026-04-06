const validate = require('../middleware/validateRequest');
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');

/* GET /api/reservations */
router.get('/', auth, async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.status(200).json(rows);
  } catch (err) {
    // Pass any unexpected errors to centralized error handler
    next(err);
  }
});

/* POST /api/reservations */
router.post('/', auth, validate(['user_id', 'resource_id', 'start_time', 'end_time']), async (req, res, next) => {
    try {
      const { user_id, resource_id, start_time, end_time, purpose } = req.body;

      // Validation errors
      if (!start_time) return res.status(400).json({ error: 'start_time is required' });
      if (!end_time) return res.status(400).json({ error: 'end_time is required' });
      if (new Date(end_time) <= new Date(start_time))
        return res.status(400).json({ error: 'End time must be after start time' });

      // Check if resource exists
      const [resource] = await db.query(
        'SELECT resource_id FROM resources WHERE resource_id = ?',
        [resource_id]
      );

      if (resource.length === 0) return res.status(404).json({ error: 'Resource does not exist' });

      // Insert reservation
      const [result] = await db.query(
        'INSERT INTO reservations (user_id, resource_id, start_time, end_time, purpose) VALUES (?, ?, ?, ?, ?)',
        [user_id, resource_id, start_time, end_time, purpose]
      );

      res.status(201).json({
        message: 'Reservation created',
        reservation_id: result.insertId
      });
    } catch (err) {
      // Unexpected errors go to centralized error handler
      next(err);
    }
  }
);

module.exports = router;