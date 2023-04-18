const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc get all users
//@route GET crm/api/v1/users
//@access private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
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
