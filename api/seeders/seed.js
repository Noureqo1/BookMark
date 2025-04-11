const mongoose = require('mongoose');
const Book = require('../models/books');

const testBook = {
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  description: "A story of decadence and excess, The Great Gatsby portrays the lives of wealthy New Yorkers during the Roaring Twenties.",
  coverImage: "https://via.placeholder.com/300x450",
  audioFile: "https://example.com/sample-audio.mp3",
  duration: 9000, // 2.5 hours in seconds
  category: "audiobook",
  genre: ["Fiction", "Classic"],
  rating: 4.5,
  chapters: [
    {
      title: "Chapter 1: The Beginning",
      startTime: 0,
      duration: 1800
    },
    {
      title: "Chapter 2: The Party",
      startTime: 1800,
      duration: 1800
    }
  ]
};

mongoose.connect("mongodb+srv://Noureqo:12345mn3@cluster0.q8j0xqn.mongodb.net/")
.then(() => {
  console.log('Connected to MongoDB');
  return Book.create(testBook);
})
.then(book => {
  console.log('Test book created:', book);
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});