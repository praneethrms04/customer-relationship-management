const express = require("express");
const connectDB = require("./config/dbConnection");
const { errorHandler } = require("./middleware/errorHandler");
const { route } = require("./routes/userRoutes");
const dotenv = require("dotenv").config();

const app = express();
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "I am Home route" });
});

app.use(express.json())

app.use("/crm/api/v1/users", require("./routes/userRoutes"));
app.use("/crm/api/v1/auth", require("./routes/authRoutes"))

app.use(errorHandler)

const port = process.env.PORT || 5050;
app.listen(port, () => {
  console.log(`server running on Port ${port}`);
});
