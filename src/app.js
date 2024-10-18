const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const filmRoutes = require("./routes/filmRoutes");
const roomRoutes = require("./routes/roomRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const seatRoutes = require("./routes/seatRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const commentRoutes = require("./routes/commentRoutes");
const db = require("./config/database");

const app = express();
const port = process.env.PORT || 8080;

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/auth", authRoutes);
app.use("/film", filmRoutes);
app.use("/room", roomRoutes);
app.use("/session", sessionRoutes);
app.use("/seat", seatRoutes);
app.use("/reservation", reservationRoutes);
app.use("/comment", commentRoutes);
