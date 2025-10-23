const express = require("express");
const cors = require("cors");
const path = require("path");
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');
const authRoutes = require("./routes/auth.router");
const MovieRoutes = require("./routes/movie.router");
const TVRoutes = require("./routes/tv.router");
const SearchRoutes = require("./routes/search.router");
const { ENV_VARS } = require("./config/envVars");
const { connectDB } = require("./config/db");
const { protectRoute } = require("./middleware/protectRoute");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = ENV_VARS.PORT;

// Load Swagger documentation
let swaggerDocument;
try {
  swaggerDocument = YAML.load(fs.readFileSync('./api-docs.yaml', 'utf8'));
} catch (error) {
  console.log('Swagger documentation not found. API docs will not be available.');
}

app.use(
  cors({
    origin: [ 
      "http://localhost:5174",
      "http://localhost:5173",
      "https://movies-website-eosin.vercel.app/"
    ],
    credentials: true, // يسمح بإرسال الكوكيز والتوكين
  })
);
app.use(express.json());
app.use(cookieParser());

// Swagger UI setup
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Netflix Clone API Documentation"
  }));
  console.log(`📚 API Documentation available at: http://localhost:${PORT}/api-docs`);
}

// initialize DB connection on cold start (useful for serverless)
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, MovieRoutes);
app.use("/api/v1/tv", protectRoute, TVRoutes);
app.use("/api/v1/search", protectRoute, SearchRoutes);

app.get("/", (req, res) => {
  res.send("Netflix Clone API is running");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
