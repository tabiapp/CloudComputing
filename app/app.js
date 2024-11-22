const express = require("express");
const cors = require('cors');
const regionRoutes = require("./routes/regionRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route untuk API
app.use("/api/regions", regionRoutes);

module.exports = app;
