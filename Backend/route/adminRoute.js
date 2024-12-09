const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");

router.post("/register", AuthController.adminRegister);
router.post("/login", AuthController.adminLogin);

module.exports = router;