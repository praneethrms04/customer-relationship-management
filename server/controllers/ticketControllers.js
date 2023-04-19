const Ticket = require("../models/ticketModel");
const asyncHandler = require("express-async-handler");
const { userTypes, UserStatus } = require("../utils/constants");
const User = require("../models/userModel");

// @desc get all tickets
// @route GET crm/api/v1/tickets
// @access public

const getTickets = asyncHandler(async (req, res) => {
  const ticket = await Ticket.find({});
  res.status(200).json(ticket);
});

// @desc get ticket by id
// @route GET crm/api/v1/tickets/:id
// access public

const getTickectbyId = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  res.status(200).json(ticket);
});

// @desc create a ticket
// @route POST crm/api/v1/tickets
// access public

const createTicket = asyncHandler(async (req, res) => {
  const ticketObj = {
    title: req.body.title,
    ticketPriority: req.body.ticketPriority,
    description: req.body.description,
    status: req.body.status,
    reporter: req.userId,
  };
  // find the engineer who has approved

  const engineer = await User.findOne({
    userTypes: userTypes.engineer,
    userStatus: UserStatus.approved,
  });
  ticketObj.assignee = engineer.userId;

  const ticket = await Ticket.create(ticketObj);

  if (ticket) {
    res.status(201).json(ticket);
  }else{
    res.status(500)
    throw new Error("Some internal server")
  }
});

// @desc update a ticket
// @route PUT crm/api/v1/tickets/:id
// access public

const updateTicket = asyncHandler(async (req, res) => {
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  createTicket,
  getTickets,
  getTickectbyId,
  updateTicket,
};
