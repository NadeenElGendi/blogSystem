// config/cloudinary.js
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_posts",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
    transformation: [{ width: 800, height: 600, crop: "limit" }],
  },
});

const upload = multer({ storage });

export { upload, cloudinary };
