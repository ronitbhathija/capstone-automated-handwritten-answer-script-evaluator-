const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();  // Store the file in memory
const upload = multer({ storage: storage });


const { login, signup, extracttext, calculatescore } = require("../controllers/Auth");

const { auth, isstudent, isinstructor } = require("../middlewares/auth"); //middlewares


router.post("/login", login);
router.post("/signup", signup);
router.post("/extracttext", upload.single('image'), extracttext);
router.post("/calculatescore", calculatescore);

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