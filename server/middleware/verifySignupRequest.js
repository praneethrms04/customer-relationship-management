const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const verifySignupRequest = asyncHandler(async (req, res, next) => {
  const { name, userId, email } = req.body;

  // validate the username
  if (!name) {
    res.status(400);
    throw new Error("Username is not provided");
  }

  // validate the userId

  if (!userId) {
    res.status(400);
    throw new Error("UserId is not provided");
  }

  let userAvailable = await User.findOne({ userId });
  if (userAvailable) {
    res.status(400);
    throw new Error("UserId already exists");
  }

  // validate the email

  if (! email) {
    res.status(400);
    throw new Error("email is provided");
  }


  let mailAvailable = await User.findOne({ email });
  if (mailAvailable) {
    res.status(400);
    throw new Error("Email already exist");
  }

  next();
});

module.exports = { verifySignupRequest };
