const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    res.json({
        token: "token"
    })
})
router.post("/login", (req, res) => {
    res.json({
        token: "token"
    })
})
module.exports = router;