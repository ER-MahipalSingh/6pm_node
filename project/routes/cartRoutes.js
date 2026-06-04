const express = require("express");

const { isAuth } = require("../middleware/isAuth");
const { addToCart, getCart, removeItemFromCart } = require("../controller/cartController");

const router = express.Router();

router.post("/addtocart", isAuth, addToCart);
router.get("/get", isAuth, getCart);
router.delete("/delete/:id", isAuth, removeItemFromCart);

module.exports = router;
