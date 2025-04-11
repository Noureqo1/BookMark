const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  audioFile: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['audiobook', 'podcast', 'course', 'kids']
  },
  genre: [{
    type: String,
    required: true
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  chapters: [{
    title: String,
    startTime: Number,
    duration: Number
  }]
}, {
  timestamps: true
});

// Add text index for search functionality
bookSchema.index({ 
  title: 'text', 
  author: 'text', 
  description: 'text' 
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;