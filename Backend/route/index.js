const express = require("express");
const adminRoute = require("./adminRoute");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const loanRoute = require("./loanRoute");
const router = express.Router();

router.use("/admin", adminRoute);
router.use("/auth", authRoute); 
router.use("/users", userRoute);
router.use("/loans", loanRoute)
module.exports = router