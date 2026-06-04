const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

exports.addToCart = async (req, res) => {
  try {
    const { name, price, quantity, productID } = req.body;
    if (!name || !price || !quantity || !productID) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    const product = await Product.findById(productID);
    if (!productID) {
      return res.status(400).json({ message: "Product not found" });
    }

    const user = req.user.id;
    let cart = await Cart.findOne({ user });
    if (!cart) {
      cart = await Cart.create({ user, cartItems: [] });
    }

    const findIdx = cart.cartItems.findIndex(
      (item) => item.productID.toString() === productID,
    );
    if (findIdx > -1) {
      cart.cartItems[findIdx].quantity += quantity;
    } else {
      cart.cartItems.push({ productID, name, price, quantity });
    }
    cart.totalAmount = cart.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    await cart.save();
    return res.status(201).json({ success: true, cart });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: "Add to cart failed" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const user = req.user.id;
    // console.log(user);

    const cart = await Cart.findOne({ user }).populate({
      path: "cartItems.productID",
      model: "Product",
    });
    // console.log(cart);

    if (!cart) {
      return res.status(400).json({ message: "cart empty" });
    }
    return res.status(201).json({ success: true, cart });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ message: " cart load failed" });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { productID } = req.body;
    const userId = req.user.id;

    if (!productID) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required to remove an item",
      });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for this user",
      });
    }

    const itemExists = cart.cartItems.some(
      (item) => item.productID.toString() === productID,
    );

    if (!itemExists) {
      return res.status(404).json({
        success: false,
        message: "Item not found in your cart",
      });
    }

    cart.cartItems = cart.cartItems.filter(
      (item) => item.productID.toString() !== productID,
    );

    cart.totalAmount = cart.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Item successfully removed from cart",
      cart,
    });
  } catch (error) {
    console.error(`[RemoveFromCart Error]: ${error.message}`, error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while removing item from cart",
    });
  }
};
