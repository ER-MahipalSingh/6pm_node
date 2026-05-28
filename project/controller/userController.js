const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");
const OTP = require("../model/otpModel");
const { sendMail } = require("../utils/sendMail");

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
  const token = generateToken(user.id, res);
  res.status(201).json({ message: "Login done", user, token });
};

exports.getUser = async (req, res) => {
  const allUser = await User.find();
  return res.status(201).json({ allUser });
};

exports.loadUser = async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(201).json({ message: "User profile fetched", user });
};

exports.getSingleUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(201).json({ message: "User profile fetched", user });
};

exports.updateUser = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(404).json();
  }

  // const id = req.user.id;
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updateUser = await User.findByIdAndUpdate(
    user,
    { name },
    { new: true, runValidators: true },
  );
  return res.status(201).json({ message: "Profile updated", updateUser });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const deleteUser = await User.findByIdAndDelete(user);
  return res.status(201).json({ message: "User deleted" });
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "email required" });
  }

  const user = await User.findOne({ email }).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otpGenerate = await Math.floor(
    100000 + Math.random() * 999999,
  ).toString();
  const hashOTP = await bcrypt.hash(otpGenerate, 10);
  const otpSave = await OTP.findOneAndUpdate(
    { email: user.email },
    {
      email,
      otp: hashOTP,
      expireIN: new Date(Date.now() + 10 * 60 * 1000),
    },
    { new: true, upsert: true },
  );

  await sendMail({
    email,
    subject: "OTP for password reset",
    text: `OTP ${otpGenerate}`,
  });

  return res.status(201).json({ message: "OTP send done", otpGenerate });
};

exports.passReset = async (req, res) => {
  const { email, otp, password, confiramPass } = req.body;
  if (!email || !otp || !password || !confiramPass) {
    return res.status(400).json({ message: "All fildes are required" });
  }

  if (password !== confiramPass) {
    return res.status(400).json({ message: "Password not matched" });
  }

  const otpCheck = await OTP.findOne({ email });
  console.log(otpCheck);

  if (!otpCheck) {
    return res.status(400).json({ message: "OTP not found" });
  }

  // if (otpCheck.otp !== otp) {
  //   return res.status(400).json({ message: "Invalid OTP" });
  // }
  if (otpCheck.expireIN < new Date()) {
    return res.status(400).json({ message: "OTP is expired" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not Found" });
  }

  const isOtpValid = await bcrypt.compare(otp.toString(), otpCheck.otp);
  if (!isOtpValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const hashPass = await bcrypt.hash(password, 10);
  user.password = hashPass;
  await user.save();
  await OTP.deleteOne({ email }); 
  return res.status(201).json({ message: "Password Change successfully" });
};
