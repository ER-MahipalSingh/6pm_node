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
  adminLogin,
} = require("../controller/userController");
const { isAuth } = require("../middleware/isAuth");
const { isAdmin } = require("../middleware/isAdmin");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/get-all", isAuth, isAdmin, getUser);
router.get("/me", isAuth, loadUser);
router.get("/:id", isAuth, getSingleUser);
router.put("/update", isAuth, updateUser);
router.delete("/delete", isAuth, deleteUser);
router.post("/otp-send", isAuth, sendOTP);
router.post("/password-reset", isAuth, passReset);

module.exports = router;
