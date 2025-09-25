const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ خليها هنا قبل أي Route
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = ENV_VARS.PORT;

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, MovieRoutes);
app.use("/api/v1/tv", protectRoute, TVRoutes);
app.use("/api/v1/search", protectRoute, SearchRoutes);

// To Deploy
app.get("/", (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
  connectDB();
});
