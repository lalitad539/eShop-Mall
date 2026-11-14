require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "https://e-shop-mall.vercel.app"
    ],

    credentials: true
  })
);
app.use("/api/auth", authRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("eShop Mall Backend is running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port $(PORT)`);
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error.message);
  });