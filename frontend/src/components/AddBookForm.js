import React, { useState } from "react";

function AddBookForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !pages) {
      setErrorMessage("Enter all the fields");
      return;
    }
    onAdd({ title, author, pages });
    setTitle("");
    setAuthor("");
    setPages("");
    setErrorMessage("");
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit}>
      <h2>ADD A NEW BOOK</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Pages"
        value={pages}
        onChange={(e) => setPages(e.target.value)}
      />
      <button type="submit">Add Book</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default AddBookForm;
