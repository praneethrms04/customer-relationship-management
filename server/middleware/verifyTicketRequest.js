const asyncHandler = require("express-async-handler");

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

module.exports = { verifyTicketRequest };
