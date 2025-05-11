const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },


  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for faster queries
ReviewSchema.index({ book: 1, createdAt: -1 });

module.exports = mongoose.model('Review', ReviewSchema);
