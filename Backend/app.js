const express = require("express");
const cors = require("cors");
const routes = require("./route/index");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
module.exports = app;
