const express = require("express");
const adminRoute = require("./adminRoute");
const authRoute = require("./authRoute");
const userRoute = require("./userRoute");
const loanRoute = require("./loanRoute");
const kycRoute = require("./kycRoute");
const router = express.Router();

router.use("/admin", adminRoute);
router.use("/auth", authRoute);
router.use("/users", userRoute);
router.use("/loans", loanRoute);
router.use("/customers/kyc", kycRoute);
module.exports = router;
