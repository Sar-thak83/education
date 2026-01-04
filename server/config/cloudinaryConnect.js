const cloudinary = require("cloudinary").v2;
const clgDev = require("../utils/clgDev");
require("dotenv").config({ path: "./.env" });

const cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    console.log("Cloudinary Connected");
  } catch (err) {
    console.error("Cloudinary Connection Failed:");
    console.error(err);
  }
};

module.exports = cloudinaryConnect;
