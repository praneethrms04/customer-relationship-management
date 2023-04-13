const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").get(getAllUsers);

router.route("/:id").get(getUserById);

router.route("/").post(createUser);

module.exports = router;
