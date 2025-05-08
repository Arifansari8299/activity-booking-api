const express = require('express');
const router = express.Router();
const {
  createActivity,
  getAllActivities,
  bookActivity
} = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getAllActivities);
router.post('/', createActivity);

// Protected Route
router.post('/book', protect, bookActivity);

module.exports = router;
