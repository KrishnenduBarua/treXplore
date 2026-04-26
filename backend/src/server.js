const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const { testConnection } = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const placesRoutes = require("./routes/places.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = (
  process.env.CORS_ORIGIN || "http://127.0.0.1:5500,http://localhost:5500"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "TreXplore API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/places", placesRoutes);
app.use("/api/profile", profileRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json({ message: error.message || "Unexpected server error" });
});

async function startServer() {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is required in environment variables");
    }

    await testConnection();
    app.listen(port, () => {
      console.log(`TreXplore API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
