const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

exports.sendMail = (option) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: option.email,
    subject: option.subject,
    text: option.text,
  };
    
};
