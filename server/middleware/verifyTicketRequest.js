const asyncHandler = require("express-async-handler");
const { ticketStatus } = require("../utils/constants");
const verifyTicketRequest = asyncHandler(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("Title is not provided");
  }
  if (!description) {
    res.status(400);
    throw new Error("Description is not provided");
  }
  next();
});

const validateTicketStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;
  const statusTypes = [
    ticketStatus.open,
    ticketStatus.closed,
    ticketStatus.inProgress,
    ticketStatus.blocked,
  ];
  // console.log(`status : ${status} statusarr = ${statusTypes}`)

  if (status && !statusTypes.includes(status)) {
    res.status(400);
    throw new Error(
      "status provided is invalid...! Possible values CLOSED or BLOCKED or IN_PROGESS or OPEN "
    );
  }

  next();
});

module.exports = { verifyTicketRequest, validateTicketStatus };
