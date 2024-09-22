const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGO_URL = process.env.MONGO_URL; 

const connectDB = mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = connectDB;
