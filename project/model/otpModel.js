const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    otp: {
      type: String,
      required: [true, "OTP is required"],
    },
    expireIN: {
      type: Date,
      required: [true, "Expire date is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("OTP", otpSchema);
