const express = require("express");
const cors = require("cors");
const path = require("path");
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
const __dirname = path.resolve();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, MovieRoutes);
app.use("/api/v1/tv", protectRoute, TVRoutes);
app.use("/api/v1/search", protectRoute, SearchRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}


app.listen(PORT, () => {
  connectDB();
});

// TMBD API
