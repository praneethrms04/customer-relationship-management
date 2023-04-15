const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authControllers");
const { verifySignupRequest } = require("../middleware/verifySignupRequest");

router.post("/signup", [verifySignupRequest], signup);

// router.route("/login").post(login)

router.post("/login", login);

module.exports = router;
