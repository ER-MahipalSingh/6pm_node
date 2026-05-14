const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(403).json({ message: "All fileds are required" });
    }

    const extUser = await User.findOne({ email });
    if (extUser) {
      return res.status(403).json({ message: "User is already register" });
    }

    const hasPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hasPass });
    const token = generateToken(newUser.id, res);
    res
      .status(201)
      .json({ message: "Registeration successfully", newUser, token });
  } catch (error) {
    console.error("Error: ", error);

    return res.status(500).json({ message: "Error while registration" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "All fildes are require" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "User not found" });
  }
  const passwordCom = await bcrypt.compare(password, user.password);
  console.log(passwordCom);

  if (!passwordCom) {
    return res.status(403).json({ message: "email and password dosent match" });
  }

  user.password = undefined;
  const token = generateToken(newUser.id, res);
  res.status(201).json({ message: "Login done", user, token });
};

exports.getUser = async (req, res) => {
  const allUser = await User.find();
  return res.status(201).json({ allUser });
};
