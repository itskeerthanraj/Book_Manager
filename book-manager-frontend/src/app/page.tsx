"use client";

import { useEffect, useState } from "react";

type Book = {
  _id?: string;
  title: string;
  author: string;
};

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Failed to fetch books");
    }
  };

  const addBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author }),
      });

      if (!res.ok) throw new Error("Error adding book");

      setTitle("");
      setAuthor("");
      setSuccess("Book added successfully!");
      fetchBooks(); // Refresh the list
    } catch (err) {
      setError("Failed to add book");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-3xl font-bold mb-6">📚 Book Manager</h1>

      <form onSubmit={addBook} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Book
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
      </form>

      <h2 className="text-2xl font-semibold mb-4">📖 Book List</h2>
      <ul className="space-y-2">
        {books.map((book) => (
          <li
            key={book._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-gray-600">by {book.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
