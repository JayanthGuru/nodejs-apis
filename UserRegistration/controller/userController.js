const UserModel = require("../model/User");

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		console.log(
			`--- Requesting for logging for ${email} with password ${password}`
		);

		const user = await UserModel.findOne({ email });
		if (!user) {
			res.status(404).json({ error: "User not found" });
		}
		const isPasswordCorrect = user.password === password;
		if (!isPasswordCorrect) {
			res.status(401).json({ error: "Password Incorrect" });
		}
		res.status(200).json({ message: "User is authorized", user });
	} catch (error) {
		console.log("Error in logging in user", error);
		res.status(500).json({ error: "Something is wrong with server" });
	}
};

const registerUser = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		console.log("--- Requesting for creating a new user with details", {
			username,
			email,
			password,
		});

		const user = await UserModel.findOne({ email });
		if (user) {
			res.status(403).json({ error: "email already exists" });
		}
		const newUser = await UserModel.create({ username, email, password });
		res.status(201).json({ message: "New user created", newUser });
	} catch (error) {
		console.log("--- Error in logging in user", error);
		res.status(500).json({ error: "Something is wrong with server" });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { email, oldPassword, newPassword } = req.body;
		console.log(
			`--- Requesting for resetting the possword of email = ${email} oldPassword = ${oldPassword} newPassword = ${newPassword}`
		);

		const user = await UserModel.findOne({ email });
		if (!user) {
			res.status(404).json({ error: "User not found" });
		} else if (user.password !== oldPassword) {
			res.status(401).json({ error: "Password provided is wrong" });
		} else {
			await UserModel.findByIdAndUpdate(user._id, {
				password: newPassword,
			}).then(() => {
				res.status(200).json({ message: "Password Updated" });
			});
		}
	} catch (error) {
		console.log("--- Error in resetting passwrod");
		res.status(500).json({ error: "Something wrong with the server" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserModel.findOne({ email });
		console.log(
			`--- Requesting to delete the user with email: ${email} and password given by user: ${password} database_password: ${user.password}`
		);
		const isPasswordCorrect = password === user.password;
		if (!user) {
			res.status(404).json({ error: "User not found" });
		} else if (!isPasswordCorrect) {
			res.status(403).json({ error: "Password provided does not match" });
		} else {
			await UserModel.findByIdAndDelete(user._id);
			res.status(200).json({ message: "Successfully deleted the user" });
		}
	} catch (error) {
		console.log("--- Error in deleting", error);
		res.status(500).json({ error: "Something went wrong with the server" });
	}
};

module.exports = { loginUser, registerUser, resetPassword, deleteUser };
