const mongoose = require("mongoose");
const clgDev = require("../utils/clgDev");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config({ path: "./.env" });

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI or MONGODB_URI environment variable is not defined");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully".cyan.underline.bold);
  } catch (err) {
    console.error("MongoDB Connection Failed:");
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
