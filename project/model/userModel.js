const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      // select: false,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin", "Manager"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
