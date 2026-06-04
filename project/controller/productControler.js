const Product = require("../model/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
      return res
        .status(401)
        .json({ message: "All product fields are required" });
    }
    const product = await Product.create({
      name,
      price,
      quantity,
    });
    res.status(201).json({ message: "Product added", product });
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(501).json({ message: "product adding error" });
  }
};
