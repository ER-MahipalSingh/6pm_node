const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        name: {
          type: String,
          required: [true, "Name is required"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);
