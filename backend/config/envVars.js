const dotenv = require("dotenv");
dotenv.config();
const ENV_VARS = {
  MONGOS_URL: process.env.MONGOS_URL,
  PORT: process.env.PORT || 5000,
  JWT_SECRET: process.env.JWT_SECRET || "defaultSecretKey",
  NODE_ENV: process.env.NODE_ENV || "development",
  TMBD_API_KEY: process.env.TMBD_API_KEY,
};

module.exports = { ENV_VARS };
