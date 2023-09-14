const express = require('express');
const router = express.Router();

const { login, signup } = require("../controllers/Auth");

const { auth, isstudent, isinstructor } = require("../middlewares/auth"); //middlewares


router.post("/login", login);
router.post("/signup", signup);

//protected routes
router.get("/student", auth, isstudent, (req, res) => {
    res.json({
        success: true,
        message: 'welcome to student route'
    })
});


router.get("/instructor", auth, isinstructor, (req, res) => {
    res.json({
        success: true,
        message: 'welcome to instructor route'
    })
});

module.exports = router;