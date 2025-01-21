const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");
const AdminController = require("../controller/adminController");
const { auth } = require("../middleware/auth");

router.post("/register", AuthController.adminRegister);
router.post("/login", AuthController.adminLogin);
router.get("/allLoans", auth, AdminController.getAllLoans);

module.exports = router;
