const express = require("express");
const regionRoutes = require("./routes/regionRoutes");

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Route untuk API
app.use("/api/regions", regionRoutes);

module.exports = app;
