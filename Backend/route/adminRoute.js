const express = require("express");
const router = express.Router();
const AuthController = require("../controller/authController");
const AdminController = require("../controller/adminController");
const loanController = require("../controller/loanController");
const UserController = require("../controller/userController");
const { auth } = require("../middleware/auth");

router.post("/register", AuthController.adminRegister);
router.post("/login", AuthController.adminLogin);
router.get("/allLoans", auth, AdminController.getAllLoans);
router.get("/users", auth, UserController.getAllUsers);
router.get("/loans/:id", auth, loanController.getLoansByCustomerId);
router.put("/updateLoan/:id", auth, loanController.updateLoan);
module.exports = router;
