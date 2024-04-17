import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./components/BookList";
import AddBookForm from "./components/AddBookForm";
import UpdateBookForm from "./components/UpdateBookForm";

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addBook = async (newBook) => {
    try {
      await axios.post("/books", newBook);
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const updateBook = async (id, updatedFields) => {
    try {
      await axios.put(`/books/${id}`, updatedFields);
      fetchBooks();
      setSelectedBookId(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateClick = (id) => {
    setSelectedBookId(id);
  };

  return (
    <div>
      <h1>Books</h1>
      <BookList
        books={books}
        onDelete={deleteBook}
        onUpdateClick={handleUpdateClick}
      />
      {selectedBookId && (
        <UpdateBookForm
          key={selectedBookId}
          bookId={selectedBookId}
          updateBook={updateBook} // Pass the updateBook function as a prop
        />
      )}
      <AddBookForm onAdd={addBook} />
    </div>
  );
}

export default App;
