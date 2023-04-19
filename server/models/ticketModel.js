const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    ticketPriority: {
      type: Number,
      required: true,
      default: 4,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "OPEN",
    },
    reporter: {
      type: String,
    },
    assignee: {
      type: String,
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
  },
  {
    versionKey: false, // this will remove the __v field, which indicates the internal revision of the document
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
