const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "MongoDB Connected",
      connect.connection.name,
      connect.connection.host
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDB;
