const express = require("express");

const { register, login, getUser } = require("../controller/userController");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-all", isAuth, getUser);

module.exports = router;
