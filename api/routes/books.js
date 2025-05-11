const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/books');
const { auth, isAdmin } = require('../middleware/auth');

// Get all books with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const { category, genre, search, page = 1, limit = 10 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (genre) query.genre = genre;
    if (search) {
      query.$text = { $search: search };
    }

    const books = await Book.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Book.countDocuments(query);

    res.json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes for content management
// Add new book
router.post('/', auth, isAdmin, async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update book
router.patch('/:id', auth, isAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete book
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User interactions
// Get reviews for a book
router.get('/:id/reviews', async (req, res) => {
  try {
    // First find all reviews and populate user data
    const reviews = await Review.find({ book: req.params.id })
      .populate({
        path: 'user',
        select: 'name email'
      })
      .sort({ createdAt: -1 });

    // Update book's review stats
    const book = await Book.findById(req.params.id);
    if (book) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      book.averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
      book.reviewCount = reviews.length;
      await book.save();
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add review
router.post('/:id/reviews', auth, async (req, res) => {
  const { rating, comment } = req.body;

  // Validate input
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Check if user has already reviewed this book
    const existingReview = await Review.findOne({
      book: req.params.id,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this book' });
    }

    const review = new Review({
      book: req.params.id,
      rating: req.body.rating,
      comment: req.body.comment,
      user: req.user._id
    });

    await review.save();

    // Get the populated review
    const populatedReview = await Review.findById(review._id)
      .populate({
        path: 'user',
        select: 'name email'
      });

    // Update book's average rating
    const reviews = await Review.find({ book: req.params.id });
    const totalRating = reviews.reduce((sum, item) => sum + item.rating, 0);
    const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

    book.averageRating = averageRating;
    book.reviewCount = reviews.length;
    await book.save();

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update reading progress
router.post('/:id/progress', auth, async (req, res) => {
  try {
    const user = req.user;
    const bookId = req.params.id;
    const { progress } = req.body;

    const readingItem = user.currentlyReading.find(
      item => item.book.toString() === bookId
    );

    if (readingItem) {
      readingItem.progress = progress;
      readingItem.lastPlayed = new Date();
    } else {
      user.currentlyReading.push({
        book: bookId,
        progress,
        lastPlayed: new Date()
      });
    }

    await user.save();
    res.json(user.currentlyReading);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
