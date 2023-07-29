const mongoose = require("mongoose");

const db = mongoose
	.connect(process.env.MONGODB_URL)
	.then(() => console.log("Connected to the database"))
	.catch((error) => console.log("Error connecting to Database:", error));

module.exports = db;
