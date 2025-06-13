import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoutes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("ENV FROM INDEX:", {
  name: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
  secret: process.env.CLOUDINARY_API_SECRET,
});
