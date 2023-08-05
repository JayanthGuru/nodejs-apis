require("dotenv").config();

const mongoose = require("mongoose");

const db = mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => {
		console.log("Successfully connected to Database");
	})
	.catch((error) => {
		console.log(`Error in connecting to database ${error}`);
	});

module.exports = db;
