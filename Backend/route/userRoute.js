const express = require("express");
const {auth} = require("../middleware/auth");
const UserController = require("../controller/userController");

const router = express.Router();

router.get("/", auth, UserController.getAllUsers);
router.get("/:id", auth, UserController.getAUser);

module.exports = router