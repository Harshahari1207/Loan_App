const express = require("express");
const cors = require("cors");
const passport = require("passport");
const routes = require("./route/index");
const {jwtStrategy} = require("./middleware/auth");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);


app.use("/api", routes);

module.exports = app;
