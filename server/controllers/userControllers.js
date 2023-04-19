const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { userResponse } = require("../utils/objectConverter");

//@desc get all users
//@route GET crm/api/v1/users
//@access private

const getAllUsers = asyncHandler(async (req, res) => {
  // filter the users by using username => params

  const userNameReq = req.query.name;
  const userTypeReq = req.query.userTypes;
  const userStatusReq = req.query.userStatus;

  let users;
  if (userNameReq) {
    try {
      users = await User.find({
        name: userNameReq,
      });
    } catch (error) {
      console.error(
        "error while fetching the user for userName : ",
        userNameReq
      );
      res.status(500);
      throw new Error("Some internal error occured");
    }
  } else if (userTypeReq && userStatusReq) {
    try {
      users = await User.find({
        userTypes: userTypeReq,
        userStatus: userStatusReq,
      });
    } catch (error) {
      console.error(
        `error while fetching the user for userType [${userTypeReq}] and userStatus [${userStatusReq}]`
      );
    }
  } else if (userTypeReq) {
    try {
      users = await User.find({ userTypes: userTypeReq });
    } catch (error) {
      console.error(
        "error while fetching the user for userTypes : ",
        userTypeReq
      );
      res.status(500);
      throw new Error("Some internal error occured");
    }
  } else if (userStatusReq) {
    try {
      users = await User.find({ userStatus: userStatusReq });
    } catch (error) {
      console.error(
        "error while fetching the user for userStatus : ",
        userStatus
      );
      res.status(500);
      throw new Error("Some internal error occured");
    }
  } else {
    try {
      users = await User.find({});
    } catch (error) {
      console.error("error while fetching the user for userStatus");
      res.status(500);
      throw new Error("Some internal error occured");
    }
  }
  res.status(200).json(userResponse(users));
});

//@desc get one user~
//@route GET crm/api/v1/users/:id
//@access private

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user is not present");
  }
  res.status(200).json(user);
});

//@desc post one user
//@route POST crm/api/v1/users/
//@access public

const createUser = asyncHandler(async (req, res) => {
  const { name, userId, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    userId,
    email,
    password: hashPassword,
  });

  if (!user) {
    return res.status(400).send({ message: "Invalid details" });
  }
  return res.status(201).send(user);
});

// @desc put user
// @route PUT crm/api/v1/users/:id
// @access private

const updateUser = asyncHandler(async (req, res) => {
  let updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

// @desc deleteuser
// @route DELETE crm/api/v1/users/:id
// @access public

const deleteUser = asyncHandler(async (req, res) => {
  let deleteUser = await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "User deleted successful ....!" });
});

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
