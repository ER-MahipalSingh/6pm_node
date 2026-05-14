const express = require("express");

const { connectDB } = require("./db/db");
const userRoutes = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/v1/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is working ${process.env.PORT}`);
});
