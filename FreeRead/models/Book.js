// BookSchema

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		author: {
			firstName: String,
			lastName: String,
		},
		genre: {
			type: String,
			required: true,
		},
		isbn: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			default: "NA",
		},
		numberOfPages: {
			type: Number,
			required: true,
		},
		publisher: {
			type: String,
			required: true,
			default: "Own",
		},
		publicationDate: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
	{
		timestamps: true, // Add timestamps to the schema
	}
);

bookSchema.virtual("authorName").get(function () {
	const fullName = `${this.author.firstName} ${this.author.lastName}`;
	if (fullName === "NA NA") {
		return "NA";
	}
	return fullName.trim();
});

const Book = mongoose.model("Book", bookSchema, "books");

// exporting the Book Model
module.exports = Book;
