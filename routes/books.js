const express = require("express");
const { getAllBooks, getBookById } = require("../controllers/books");
const router = express.Router();

// Get all books
router.get("/", getAllBooks);

// Get a specific book by ID
router.get("/:id", getBookById);

module.exports = router;
