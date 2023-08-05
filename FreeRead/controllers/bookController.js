const { isObjectIdOrHexString } = require("mongoose");
const bookModel = require("../models/Book");

// const function_name = async (req, res) => {};

const getBooks = async (req, res) => {
	// Functionality: Fetches all the books in the databse and return the books.

	console.log("--- Requesting for All Books");
	try {
		const books = await bookModel.find();
		res.status(200).json({ books });
	} catch (error) {
		console.log("--- Error in fetching all books", error);
		res.status(500).json({ error: "Something went wrong at Server end." });
	}
};

const getBookById = async (req, res) => {
	// Functionality: Fetches a single book based on Id and returns it.

	try {
		const { id } = req.params;
		console.log("--- Requesting for a single book with id:", id);

		const book = await bookModel.findById(id);

		if (!book) {
			res.status(404).json({ error: "Book not found" });
			return;
		}
		res.status(200).json({ book });
	} catch (error) {
		console.log("Error in fetching the book by id", error);
		res.status(500).json({ error: "Something went wrong at Server end. " });
	}
};

const newBook = async (req, res) => {
	// Functionality: Creates a new book object in the databse and returns it.

	try {
		const {
			title,
			author,
			genre,
			isbn,
			description,
			numberOfPages,
			publisher,
			publicationDate,
		} = req.body;

		console.log("--- Requesting for creating a new book", {
			title,
			author,
			genre,
			isbn,
			description,
			numberOfPages,
			publisher,
			publicationDate,
		});

		const book = await bookModel.findOne({ title });
		if (book) {
			res.status(403).json({
				error: "Book with same title exists, rename your book.",
			});
		}
		const newBook = await bookModel.create({
			title,
			author,
			genre,
			isbn,
			description,
			numberOfPages,
			publisher,
			publicationDate,
		});
		res.status(200).json({
			message: "Successfully added the book to database",
			newBook,
		});
	} catch (error) {
		console.log("Error in creating the book", error);
		res.status(500).json({ error: "Something went wrong at Server end." });
	}
};

const updateBook = async (req, res) => {
	// Updating the book record in the database.

	try {
		const { id } = req.params;
		const updates = req.body;
		console.log(
			"--- Requesting to update book with id:",
			id,
			"with updates:",
			updates
		);

		const book = await bookModel.findById(id);
		if (!book) {
			return res.status(400).json({ error: "Book not found" });
		}

		// Updating
		Object.keys(updates).forEach((field) => {
			book[field] = updates[field];
		});

		// Saving the updated book object.
		const updatedBook = await book.save();

		return res
			.status(200)
			.json({ message: "Book updated successfully", updatedBook });
	} catch (error) {
		console.log("Error in updating ", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const deleteBook = async (req, res) => {
	// Deleting the record form the database.

	try {
		const { id } = req.params;
		console.log(`--- Requesting for deleting the book with id: ${id}`);
		const book = await bookModel.findById(id);
		if (!book) {
			return res
				.status(403)
				.json({ error: `Book with ${id} does not exist` });
		}
		await bookModel.findByIdAndDelete(id);
		return res.status(200).json({
			message: `Successfully deleted the book Object with id: ${id}`,
		});
	} catch (error) {
		console.log("error", error);
		res.status(500).json({ error: "Internal Server error" });
	}
};

const getBookByTitle = async (req, res) => {
	// Fetching the record from the database using the title field.

	try {
		const { title } = req.body;
		if (!title) {
			return res
				.status(400)
				.json({ error: "Bad Request title is empty or missing" });
		}
		console.log(`--- Requesting for book with title as ${title}`);
		const book = await bookModel.findOne({ title });
		if (!book) {
			return res
				.status(403)
				.json({ error: `Book with ${title} does not exist` });
		}
		return res.status(200).json({
			message: `Successfully fetched the book with ${title}`,
			book,
		});
	} catch (error) {
		console.log("error :", error);
		res.status(500).json({ error: "Internal Server error" });
	}
};

const getBooksByGenre = async (req, res) => {
	// Fetching the record from the database using the genre field.

	try {
		const { genre } = req.body;
		if (!genre) {
			return res
				.status(400)
				.json({ error: "Bad Request genre is empty or missing" });
		}
		console.log(`--- Requesting for books with genre as ${genre}`);
		const books = await bookModel.find({ genre: genre });
		if (!books || books.length === 0) {
			return res
				.status(403)
				.json({ error: `There are no books listed under ${genre}` });
		}
		return res.status(200).json({
			message: `Successfully fetched the books listed usder ${genre}`,
			books,
		});
	} catch (error) {
		console.log("error :", error);
		res.status(500).json({ error: "Internal Server error" });
	}
};

const getBooksByPagesInRange = async (req, res) => {
	// Fetches books by pages in range minPages and maxPages.

	try {
		let { minPages, maxPages } = req.body;
		if (!minPages) {
			minPages = 0; // default
		}
		if (!maxPages) {
			maxPages = 100; // default
		}
		const allBooks = await bookModel.find({});
		const books = [];
		allBooks.forEach((book) => {
			console.log(book.numberOfPages);
			if (
				book.numberOfPages >= minPages &&
				book.numberOfPages <= maxPages
			) {
				books.push(book);
			}
		});
		if (!books || books.length === 0) {
			return res.status(404).json({
				error: `There are no books in range of ${minPages} to ${maxPages} try changing the range`,
			});
		}
		return res.status(200).json({ message: "Successfully done" });
	} catch (error) {
		console.log("error in getBooksByPagesInRange", error);
		return res.status(500).json({ error: "Internal Server error" });
	}
};

const getTotalCount = async (req, res) => {
	// Fetches the total count of books in the database.

	try {
		const count = (await bookModel.find({})).length;
		return res.status(200).json({ message: "Successful", count });
	} catch (error) {
		console.log("error", error);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getTopRatedBooks = async (req, res) => {
	// Fetches top rated books

	try {
		res.status(400).json({ error: "complete the function" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

const getRecentlyAddedBooks = async (req, res) => {
	// fetches the most recently added books

	try {
		const allBooks = await bookModel.find({});
		if (!allBooks || allBooks.length === 0) {
			return res.status(404).json({ error: "No books found" });
		}
		const books = allBooks.slice(-Math.min(allBooks.length, 10)).reverse();

		// const books = allBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));      // if you want to sort based on createdDate use

		if (!books || books.length === 0) {
			return res.status(404).json({ error: "No books found" });
		}
		return res.status(200).json({ message: "Successful", books });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
};

module.exports = {
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
};
