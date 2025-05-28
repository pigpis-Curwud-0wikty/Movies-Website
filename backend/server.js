const express = require("express");

const authRoutes = require("./routes/auth.router");
const MovieRoutes = require("./routes/movie.router");
const TVRoutes = require("./routes/tv.router");
const SearchRoutes = require("./routes/search.router");
const { ENV_VARS } = require("./config/envVars");
const { connectDB } = require("./config/db");
const { protectRoute } = require("./middleware/protectRoute");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());

const PORT = ENV_VARS.PORT;

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, MovieRoutes);
app.use("/api/v1/tv", protectRoute, TVRoutes);
app.use("/api/v1/search", protectRoute, SearchRoutes);


// To Deploy
app.get('/' , (req , res) => {
  res.send({
    activeStatus:true,
    error:false
  })
})

// console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);
// console.log("Loaded NODE_ENV:", process.env.NODE_ENV);
    
app.listen(5000, () => {
  console.log(`Server started at ${PORT}`);
  connectDB();
});

// TMBD API
