import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateBookForm({ bookId, updateBook }) {
  const [updatedBook, setUpdatedBook] = useState({
    title: "",
    author: "",
    pages: 0,
  });

  useEffect(() => {
    // Fetch the current book details when the component mounts
    const fetchBook = async () => {
      try {
        const response = await axios.get(`/books/${bookId}`);
        setUpdatedBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(bookId, updatedBook); // Call the updateBook function passed from App.js
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="update-book-form">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={updatedBook.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            value={updatedBook.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="number"
            id="pages"
            name="pages"
            placeholder="Pages"
            value={updatedBook.pages}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateBookForm;
