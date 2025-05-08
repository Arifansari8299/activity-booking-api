const Activity = require('../models/Activity');

// Create a new activity
exports.createActivity = async (req, res) => {
  const { title, description, location, date, time } = req.body;

  try {
    const newActivity = await Activity.create({
      title,
      description,
      location,
      date,
      time
    });

    res.status(201).json({
      message: 'Activity created successfully',
      activity: newActivity
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Book an activity (protected route)
exports.bookActivity = async (req, res) => {
  const { activityId } = req.body; // Get from body
  const userId = req.user.id;      // Fetched from token

  try {
    const activity = await Activity.findById(activityId);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    if (activity.bookedBy) {
      return res.status(400).json({ message: 'Activity already booked' });
    }

    activity.bookedBy = userId;
    await activity.save();

    res.status(200).json({
      message: 'Activity booked successfully',
      activity
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
