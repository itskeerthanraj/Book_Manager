'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold my-4">Book List</h2>
      <ul className="space-y-2">
        {books.map(book => (
          <li key={book._id} className="p-4 bg-gray-100 rounded">
            <strong>{book.title}</strong> by {book.author} ({book.publicationYear}) - {book.genre}
          </li>
        ))}
      </ul>
    </div>
  );
}
