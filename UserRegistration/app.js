const express = require("express");

const app = express();
const userRoutes = require("./routes/userRoute");

app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Welcome to user-authentication api" });
});
app.use("/api/users", userRoutes);

module.exports = app;
