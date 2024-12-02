const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");
const { validateRegister } = require("../middleware/validate");
router.post("/register", validateRegister, AuthController.register);
router.post("/login", AuthController.login);
module.exports = router;
