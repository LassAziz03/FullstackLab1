require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const videoRoutes = require("./routes/videoRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/videos", videoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

app.get("/", (req, res) => {
  res.send("MMA API running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});