const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");
const AdminController = require("../controller/adminController");
const loanController = require("../controller/loanController");
const { auth } = require("../middleware/auth");

router.post("/register", AuthController.adminRegister);
router.post("/login", AuthController.adminLogin);
router.get("/allLoans", auth, AdminController.getAllLoans);
router.put("/updateLoan/:id", auth, loanController.updateLoan);
module.exports = router;
