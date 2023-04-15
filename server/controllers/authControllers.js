const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { userTypes, UserStatus } = require("../utils/constants");

// @desc post user signup
// route POST crm/api/v1/auth/signup
// access public

const signup = asyncHandler(async (req, res) => {
  const { name, userId, email, password } = req.body;

  let userStatus = req.body.UserStatus;
  let userType = req.body.userType;

  if (userType == userTypes.customer) {
    userStatus = UserStatus.approved;
  } else {
    userStatus = UserStatus.pending;
  }

  let hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    userId,
    email,
    userType,
    userStatus,
    password: hashPassword,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400).json("User data is not valid");
  }
});

// @desc post user login
// route POST crm/api/v1/auth/login
// access public

const login = asyncHandler(async (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  let user = await User.findOne({ userId });

  if (user.userId.toString() !== req.body.userId) {
    res.status(400);
    throw new Error("UserId does not exist");
  }
  // console.log(user);
  if (user.userStatus !== "APPROVED") {
    res.status(200).json({
      message: `You Can not login as user because you status is ${user.userStatus} right now.`,
    });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    res.status(401);
    throw new Error("Invalid Password");
  }
  // console.log(user);

  if (user && passwordIsValid) {
    const accessToken = jwt.sign(
      { id: user.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: 120 }
    );

    // console.log(user.userId);

    res.status(200).json({
      name: user.name,
      userId: user.userId,
      email: user.email,
      userType: user.userTypes,
      userStatus: user.userStatus,
      accessToken: accessToken,
    });
  } else {
    res.status(401);
    throw new Error("userId or password not valid");
  }

  // res.status(201).json({ message: "This is post req from login page" });
});

module.exports = { signup, login };
