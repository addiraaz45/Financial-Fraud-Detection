import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/database.js";
import { errorHandler } from "./middlewares/errorHandler.js";

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import fraudRoutes from "./routes/fraudRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(
  cors({
    origin: https://financial-fraud-detection-one.vercel.app, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/fraud", fraudRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

import User from "./models/User.js";

const createAdminUser = async () => {
  const admin = await User.findOne({ role: "admin" });
  if (!admin) {
    await User.create({
      name: "Super Admin",
      email: "admin@gmail.com",
      phone: "9999999999",
      password: "admin123",
      role: "admin",
    });
    console.log("Admin user created: admin@gmail.com / admin123");
  }
};

createAdminUser();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
