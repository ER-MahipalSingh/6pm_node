const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

exports.connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("Database is connected..."))
      .catch(() => console.log("Error while connection DB"));
  } catch (error) {
    console.error("Error: ", error);
  }
};
