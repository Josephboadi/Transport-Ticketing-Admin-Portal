const { request } = require("express");
const dotenv = require("dotenv");

const cloudinary = require("cloudinary").v2;

dotenv.config();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_NAME,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

module.exports = cloudinary;
