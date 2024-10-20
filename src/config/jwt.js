require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
  TOKEN_EXPIRATION: process.env.JWT_EXPIRATION || "24h",
};
