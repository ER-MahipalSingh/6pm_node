const express = require("express");

const {
  register,
  login,
  getUser,
  loadUser,
  getSingleUser,
  updateUser,
  deleteUser,
  sendOTP,
  passReset,
} = require("../controller/userController");
const { isAuth } = require("../middleware/isAuth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/get-all", isAuth, getUser);
router.get("/me", isAuth, loadUser);
router.get("/:id", isAuth, getSingleUser);
router.put("/update", isAuth, updateUser);
router.delete("/delete", isAuth, deleteUser);
router.post("/otp-send", isAuth, sendOTP);
router.post("/password-reset", isAuth, passReset);

module.exports = router;
