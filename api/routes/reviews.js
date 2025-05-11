const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

// Get all reviews for a book
router.get('/books/:bookId/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId })
      .sort({ createdAt: -1 })
      .populate('user', 'name');
    
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a review
router.post('/books/:bookId/reviews', async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.bookId;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Create review
    const review = new Review({
      book: bookId,
      rating,
      comment,
      user: req.user ? req.user._id : null,
      userName: req.user ? req.user.name : 'Anonymous User'
    });

    await review.save();

    // Update book's average rating
    const bookReviews = await Review.find({ book: bookId });
    const averageRating = bookReviews.reduce((acc, r) => acc + r.rating, 0) / bookReviews.length;

    await Book.findByIdAndUpdate(bookId, {
      $set: { averageRating },
      $inc: { reviewCount: 1 }
    });

    res.status(201).json(review);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a review
router.delete('/reviews/:reviewId', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if user owns the review
    if (review.user && review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.remove();

    // Update book's average rating
    const bookReviews = await Review.find({ book: review.book });
    const averageRating = bookReviews.length > 0
      ? bookReviews.reduce((acc, r) => acc + r.rating, 0) / bookReviews.length
      : 0;

    await Book.findByIdAndUpdate(review.book, {
      $set: { averageRating },
      $inc: { reviewCount: -1 }
    });

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
