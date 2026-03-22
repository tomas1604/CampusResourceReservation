const validate = require('../middleware/validateRequest');
const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

/* GET/api/resources*/
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT * FROM resources');
    res.status(200).json(rows);
  } catch (error) {
      next(error);
  }
});

/* POST/api/resources*/
router.post('/', auth, requireRole('admin'), validate(['resource_name', 'resource_type']), async (req, res, next) => {
  const { resource_name, resource_type, location, max_capacity } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO resources (resource_name, resource_type, location, max_capacity) VALUES (?, ?, ?, ?)',
      [resource_name, resource_type, location, max_capacity]
    );

    res.status(201).json({
      message: 'Resource created',
      resource_id: result.insertId
    });
  } catch (error) {
      next(error);  
  }
});

module.exports = router;