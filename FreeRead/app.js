const express = require("express");

const app = express();
app.use(express.json());

// importing routes
const bookRoutes = require("./routes/bookRoute");

//adding routes to app
app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to Books Api" });
});

app.use("/api/books", bookRoutes);

module.exports = app;
