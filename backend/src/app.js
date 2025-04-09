require("dotenv").config();

const express = require("express");
const path = require("path");
require("./db/conn");
const cors = require("cors");
const authRoutes = require("./routers/authRoutes");

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//File upload
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"), {
    setHeaders: (res, path, stat) => {
      res.set("Cache-Control", "no-store");
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
