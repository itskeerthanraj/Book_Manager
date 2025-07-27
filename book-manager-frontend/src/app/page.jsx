'use client';
import AddBookForm from '@/components/AddBookForm';
import BookList from '@/components/BookList';
import { useState } from 'react';

export default function Home() {
  const [reload, setReload] = useState(false);

  const refreshBooks = () => setReload(!reload);

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">📚 Book Manager</h1>
      <AddBookForm onBookAdded={refreshBooks} />
      <BookList key={reload} />
    </main>
  );
}
