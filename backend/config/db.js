const mongoose = require("mongoose");
const { ENV_VARS } = require("./envVars");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ziadmohamed123:6sFOeFPqL199DbUF@cluster0.kel3mly.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MonogDB connected: " + conn.connection.host);
  } catch (error) {
    console.error("Error Connection to MongoDB: " + error.message);
    process.exit(1); // 1 means there was an error, 0 means success
  }
};

module.exports = { connectDB };
