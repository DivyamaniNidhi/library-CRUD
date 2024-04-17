const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Book = require("./models/bookModel");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Retrieve all the books------------------------------------//
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new book---------------------------------------------//
app.post("/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing book ---------------------------------------------//
app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.body.title != null) {
      book.title = req.body.title;
    }
    if (req.body.author != null) {
      book.author = req.body.author;
    }
    if (req.body.pages != null) {
      book.pages = req.body.pages;
    }

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book from DB------------------------------------//

app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
