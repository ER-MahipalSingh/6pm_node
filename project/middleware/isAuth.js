const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    // console.log(token); 

    if (!token) {
      return res.status(404).json({ message: "User is not valid" });
    }
    const decoaded = await jwt.verify(token, "jkgjgghdrtdtyu");
    req.user = await User.findById(decoaded.id);
    if (!req.user) {
      return res.status(403).json({ message: "User not found" });
    }
    next();
  } catch (error) {
    console.log("Error: ", error);
  }
};
