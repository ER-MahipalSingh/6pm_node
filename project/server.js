require("dotenv").config();
const express = require("express");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const { connectDB } = require("./db/db");
const userRoutes = require("./routes/userRoute");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

connectDB();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cart", cartRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is working ${process.env.PORT}`);
});
