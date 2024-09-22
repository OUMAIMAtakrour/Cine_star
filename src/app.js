const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRepository = require("./repositories/implementations/authRepository");
const authRoutes = require('./routes/authRoutes');
const db = require("../src/config/database");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use('/auth', authRoutes);


