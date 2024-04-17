import React, { useState } from "react";

function BookList({ books, onDelete, onUpdateClick }) {
  return (
    <div>
      <ul className="book-list">
        {books.map((book) => (
          <li className="book-item" key={book._id}>
            {book.title} by {book.author} ({book.pages} pages)
            <button onClick={() => onDelete(book._id)}>Delete</button>
            <button onClick={() => onUpdateClick(book._id)}>Update Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
