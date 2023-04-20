const Ticket = require("../models/ticketModel");
const asyncHandler = require("express-async-handler");
const { userTypes, UserStatus } = require("../utils/constants");
const User = require("../models/userModel");

// @desc get all tickets
// @route GET crm/api/v1/tickets
// @access public

const getTickets = asyncHandler(async (req, res) => {
  const queryObj = {};

  const user = await User.findOne({
    userId: req.userId,
  });

  if (user.userType == userTypes.admin) {
    //Do nothing
  } else if (user.userType == userTypes.engineer) {
    queryObj.assignee = req.userId;
    // queryObj={ $or:[{assignee:req.userId},{requestor:req.userId}]};
  } else {
    queryObj.reporter = req.userId;
  }

  const tickets = await Ticket.find(queryObj);
  res.status(200).send(tickets);
});

// @desc get ticket by id
// @route GET crm/api/v1/tickets/:id
// access private

const getTickectbyId = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(400);
    throw new Error("Ticket is not found");
  }
  res.status(200).json(ticket);
});

// @desc create a ticket
// @route POST crm/api/v1/tickets
// access private

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
    // update the customer
    const user = await User.findOne({ userId: req.userId });
    user.ticketsCreated.push(ticket._id);
    engineer.ticketsAssigned.push(ticket._id);
    await engineer.save();
    res.status(201).json(ticket);
  } else {
    res.status(500);
    throw new Error("Some internal server");
  }
});

// @desc update a ticket
// @route PUT crm/api/v1/tickets/:id
// access private

const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.params.id });

  const savedUser = await User.findOne({
    userId: req.userId,
  });

  if (
    ticket.reporter == req.userId ||
    ticket.assignee == req.userId ||
    savedUser.userType == constants.userTypes.admin
  ) {
    //Allowed to update
    (ticket.title =
      req.body.title != undefined ? req.body.title : ticket.title),
      (ticket.description =
        req.body.description != undefined
          ? req.body.description
          : ticket.description),
      (ticket.ticketPriority =
        req.body.ticketPriority != undefined
          ? req.body.ticketPriority
          : ticket.ticketPriority)(
        (ticket.status =
          req.body.status != undefined ? req.body.status : ticket.status)
      ),
      (ticket.assignee =
        req.body.assignee != undefined ? req.body.assignee : ticket.assignee);

    var updatedTicket = await ticket.save();

    const engineer = await User.findOne({
      userId: ticket.assignee,
    });

    const reporter = await User.findOne({
      userId: ticket.reporter,
    });

    res.status(200).json(updatedTicket);
  } else {
    res.status(401);
    throw new Error(
      "Ticket can be updated only by the customer who created it"
    );
  }
});

module.exports = {
  createTicket,
  getTickets,
  getTickectbyId,
  updateTicket,
};
