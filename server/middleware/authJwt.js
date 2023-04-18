const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { userTypes } = require("../utils/constants");
const asyncHandler = require("express-async-handler");

const verifyToken = asyncHandler((req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(401);
    throw new Error("No token Provided");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error("Invlalid user details");
    }
    req.userId = decoded.id;
    // console.log(req.userId)
    next();
  });
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ userId: req.userId });
  // console.log(user)
  if (user && user.userTypes === userTypes.admin) {
    next();
  } else {
    res.status(401);
    throw new Error("Requirres admin role");
  }
});

module.exports = { verifyToken, isAdmin };
