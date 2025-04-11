import React, { useState } from 'react';
import api from '../../utils/api';

const BookForm = ({ onClose, onSave, book = null }) => {
  const [title, setTitle] = useState(book?.title || '');
  const [author, setAuthor] = useState(book?.author || '');
  const [description, setDescription] = useState(book?.description || '');
  const [coverImage, setCoverImage] = useState(book?.coverImage || '');
  const [audioFile, setAudioFile] = useState(book?.audioFile || '');
  const [category, setCategory] = useState(book?.category || 'audiobook');
  const [duration, setDuration] = useState(book?.duration || 0);
  const [genre, setGenre] = useState(book?.genre?.[0] || '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const bookData = {
      title,
      author,
      description,
      coverImage,
      audioFile,
      category,
      duration: Number(duration),
      genre: [genre]
    };

    try {
      let response;
      if (book) {
        response = await api.patch(`/books/${book._id}`, bookData);
      } else {
        response = await api.post('/books', bookData);
      }

      if (response.status === 200 || response.status === 201) {
        onSave(response.data);
      }
    } catch (err) {
      console.error('Error submitting book:', err);
      setError(err.response?.data?.error || err.message || 'Failed to submit book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Cover Image URL"
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Audio File URL (MP3, OGG, or WAV format)"
        value={audioFile}
        onChange={(e) => setAudioFile(e.target.value)}
        pattern=".*\.(mp3|ogg|wav)$"
        title="Please enter a valid MP3, OGG, or WAV audio file URL"
        required
        className="w-full p-2 border rounded"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 border rounded"
        required
      >
        <option value="audiobook">Audiobook</option>
        <option value="podcast">Podcast</option>
        <option value="course">Course</option>
        <option value="kids">Kids</option>
      </select>

      <input
        type="number"
        placeholder="Duration (in seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {book ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;