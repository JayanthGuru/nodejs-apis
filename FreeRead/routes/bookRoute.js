// importing Router from express
const { Router } = require("express");

// importing the controller dunction from bookController
const {
	getBooks,
	getBookById,
	newBook,
	updateBook,
	deleteBook,
	getBookByTitle,
	getBooksByGenre,
	getBooksByPagesInRange,
	getTotalCount,
	getTopRatedBooks,
	getRecentlyAddedBooks,
} = require("../controllers/bookController");

// creating a router object
const router = Router();

// ----- defining the routes for api -----

// Create a new book
router.post("/newBook", newBook);

// Update the book details
router.put("/:id", updateBook);

// Delete a book
router.delete("/:id", deleteBook);

// Search books by title
router.get("/search/title", getBookByTitle);

// Search books by genre
router.get("/search/genre", getBooksByGenre);

// Search books in range off page numbers
router.get("/search/pages", getBooksByPagesInRange);

// Get the count of total number of books
router.get("/count", getTotalCount);

// Get top rated books
router.get("/top-rated", getTopRatedBooks);

// Get recently added books
router.get("/recent", getRecentlyAddedBooks);

// Get all Books
router.get("/", getBooks);

// Get a single book based on id
router.get("/:id", getBookById);

module.exports = router;
