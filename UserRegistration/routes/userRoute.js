const { Router } = require("express");

const {
	loginUser,
	registerUser,
	resetPassword,
	deleteUser,
} = require("../controller/userController");

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ message: "Hello welcome to user registration api" });
});

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/reset", resetPassword);

router.delete("/delete", deleteUser);

module.exports = router;
