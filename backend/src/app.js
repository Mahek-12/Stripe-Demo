const express = require("express");
require("./db/conn");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
const authRoutes = require("./routers/authRoutes");

const app = express();
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
