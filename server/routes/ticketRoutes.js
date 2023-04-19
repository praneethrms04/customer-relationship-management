const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authJwt");
const {
  createTicket,
  getTickets,
  getTickectbyId,
  updateTicket,
} = require("../controllers/ticketControllers");

router.post("/", [verifyToken], createTicket);
router.get("/", getTickets);
router.get("/:id", getTickectbyId);
router.put("/:id", updateTicket);

module.exports = router;