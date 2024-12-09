const express = require("express");
const router = express.Router();
const LoanController = require("../controller/loanController");
const { auth } = require("../middleware/auth");

router.use(auth);
router.get("/customer/:id", LoanController.getLoansByCustomerId);
router.put("/:id", LoanController.updateLoan);
router.post("/", LoanController.postLoan);

module.exports = router;
