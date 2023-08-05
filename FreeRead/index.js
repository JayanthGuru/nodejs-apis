require("dotenv").config();

// importing app and db
const app = require("./app");
const db = require("./config/db");

// use a default port if the port is not defined in env file
const PORT = process.env.PORT || 3000;

// calling the db function imported for connecting to Datbase
db.then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port number ${PORT}`);
	});
}).catch((error) => {
	console.log("Error connecting to Database", error);
});
