const express = require("express");
const router = express.Router();
const KycController = require("../controller/kycController");
const { auth } = require("../middleware/auth");

router.post("/", auth, KycController.postKyc);

module.exports = router;
