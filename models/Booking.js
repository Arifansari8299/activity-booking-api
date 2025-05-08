// models/Booking.js

const mongoose = require('mongoose');

// Booking schema
const bookingSchema = mongoose.Schema(
  {
    activity: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Activity', 
      required: true 
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    bookingDate: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true
  }
);

// Create the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
