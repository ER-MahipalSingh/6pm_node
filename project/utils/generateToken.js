const jwt = require("jsonwebtoken");

exports.generateToken = (id, res) => {
  const token = jwt.sign({ id }, "jkgjgghdrtdtyu", {
    expiresIn: "7d",
  });

  const option = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: "strict",
    httpOnly: true,
  };
  res.cookie(token, option);
  return token;
};
