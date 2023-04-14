const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc get all users
//@route GET crm/api/v1/users
//@access public

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
};

//@desc get one user~
//@route GET crm/api/v1/users/:id
//@access public

const getUserById = async (req, res) => {
  const user =await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("user is not present");
  }
  res.status(200).json(user);
};

//@desc post one user
//@route POST crm/api/v1/users/
//@access public

const createUser = async (req, res) => {
  const { name, userId, email, password } = req.body;

  // checking the fields
  

  if (!name || !userId || !email || !password) {
    res.status(400);
    throw new Error("All fields are Mandatory");
  }

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
};

module.exports = { getAllUsers, getUserById, createUser };
