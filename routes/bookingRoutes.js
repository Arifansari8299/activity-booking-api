// routes/bookingRoutes.js

const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { bookActivity, getUserBookings } = require('../controllers/bookingController');

const router = express.Router();

// Route to book an activity
router.post('/book', protect, bookActivity);

// Route to get all bookings of a user
router.get('/my-bookings', protect, getUserBookings);

module.exports = router;
