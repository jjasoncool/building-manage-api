"use strict";

const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  app: {
    NODE_ENV: process.env.NODE_ENV || "local",
    PORT: process.env.PORT || 3000,
  },
  db: {
    MONGODB_DEBUG: process.env.MONGODB_DEBUG === "true",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    MONGODB_NAME: process.env.MONGODB_NAME || "building-management",
  },
};
