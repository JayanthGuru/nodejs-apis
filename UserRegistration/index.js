require("dotenv").config();
const db = require("./config/db");
const app = require("./app");

const PORT = process.env.port || 5000;

db.then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
}).catch((error) => {
	console.log("Error in coonecting to DB", error);
});
