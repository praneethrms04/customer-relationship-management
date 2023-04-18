const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const router = express.Router();

// router.route("/").get(getAllUsers);

router.get("/",[verifyToken, isAdmin],  getAllUsers);
router.get("/:id",[verifyToken, isAdmin], getUserById )
router.put("/:id",[verifyToken, isAdmin], updateUser)
router.delete("/:id", [verifyToken, isAdmin], deleteUser)


module.exports = router;
