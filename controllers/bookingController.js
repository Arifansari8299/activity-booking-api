// controllers/bookingController.js

const Booking = require('../models/Booking');
const Activity = require('../models/Activity');
const User = require('../models/User');

// Book an Activity (for authorized users)
exports.bookActivity = async (req, res) => {
  const { activityId } = req.body; // Activity ID
  const userId = req.user.id;      // Logged-in user ID

  try {
    // Find the activity
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    // Check if the activity is already booked
    const existingBooking = await Booking.findOne({ activity: activityId, user: userId });
    if (existingBooking) return res.status(400).json({ message: 'You have already booked this activity' });

    // Create a new booking
    const newBooking = new Booking({
      activity: activityId,
      user: userId
    });

    await newBooking.save();

    res.status(201).json({
      message: 'Activity booked successfully',
      booking: newBooking
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all bookings of a user
exports.getUserBookings = async (req, res) => {
  const userId = req.user.id; // Logged-in user ID

  try {
    // Find all bookings for the user
    const bookings = await Booking.find({ user: userId }).populate('activity');

    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this user' });
    }

    res.status(200).json({
      message: 'Bookings retrieved successfully',
      bookings
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
