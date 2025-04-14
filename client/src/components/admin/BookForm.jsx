import React, { useState } from 'react';

const BookForm = ({ initialBook, onSubmit }) => {
  const [title, setTitle] = useState(initialBook?.title || '');
  const [author, setAuthor] = useState(initialBook?.author || '');
  const [description, setDescription] = useState(initialBook?.description || '');
  const [coverImage, setCoverImage] = useState(initialBook?.coverImage || '');
  const [audioFile, setAudioFile] = useState(initialBook?.audioFile || '');
  const [category, setCategory] = useState(initialBook?.category || 'audiobook');
  const [duration, setDuration] = useState(initialBook?.duration || '');
  const [genre, setGenre] = useState(initialBook?.genre?.[0] || '');
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
      if (initialBook) {
        response = await fetch(`http://localhost:9000/api/books/${initialBook._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(bookData)
        });
      } else {
        response = await fetch('http://localhost:9000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(bookData)
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save book');
      }

      const data = await response.json();
      onSubmit();
    } catch (err) {
      console.error('Error submitting book:', err);
      setError(err.message || 'Failed to save book');
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
        {initialBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
};

export default BookForm;