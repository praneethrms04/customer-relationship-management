const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authJwt");
const {
  verifyTicketRequest,
  validateTicketStatus,
} = require("../middleware/verifyTicketRequest");
const {
  createTicket,
  getTickets,
  getTickectbyId,
  updateTicket,
} = require("../controllers/ticketControllers");

router.post("/", [verifyToken, verifyTicketRequest], createTicket);
router.get("/", [verifyToken], getTickets);
router.get("/:id", [verifyToken], getTickectbyId);
router.put("/:id", [verifyToken, validateTicketStatus], updateTicket);

module.exports = router;
