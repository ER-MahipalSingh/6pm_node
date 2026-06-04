const express = require("express");

const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");
const { createProduct } = require("../controller/productControler");

const router = express.Router();

router.post("/create", isAuth, isAdmin, createProduct);


module.exports = router;
