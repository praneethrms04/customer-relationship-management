const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    lowercase: true,
  },
  createdAt: {
    type: String,
    immutable: true,
    default: () => Date.now(),
  },
  userTypes: {
    type: String,
    required: true,
    default: "CUSTOMER",
  },
  userStatus: {
    type: String,
    required: true,
    default: "APPROVED",
  },
  ticketsCreated: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Ticket",
  },
  ticketsAssigned: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Ticket",
  },
});

module.exports = mongoose.model("User", userSchema);
