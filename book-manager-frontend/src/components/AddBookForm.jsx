'use client';
import axios from 'axios';
import { useState } from 'react';

export default function AddBookForm({ onBookAdded }) {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    publicationYear: ''
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:5000/api/books', book);
      onBookAdded(); // refresh book list
      setBook({ title: '', author: '', genre: '', publicationYear: '' });
    } catch (err) {
      setError('Failed to add book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 my-4">
      <h2 className="text-xl font-bold">Add a New Book</h2>

      <input className="border p-2 w-full" type="text" name="title" value={book.title} onChange={handleChange} placeholder="Title" required />
      <input className="border p-2 w-full" type="text" name="author" value={book.author} onChange={handleChange} placeholder="Author" required />
      <input className="border p-2 w-full" type="text" name="genre" value={book.genre} onChange={handleChange} placeholder="Genre" required />
      <input className="border p-2 w-full" type="number" name="publicationYear" value={book.publicationYear} onChange={handleChange} placeholder="Year" required />

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
    </form>
  );
}
