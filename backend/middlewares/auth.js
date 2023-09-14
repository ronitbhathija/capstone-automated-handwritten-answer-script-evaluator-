//checks if authenticated user or not

const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        //extract jwt token
        const token = req.body.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'token missing'
            })
        }

        //verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);

            req.user = payload; //payload stored in my user
        } catch (err) {
            res.status(401).json({
                success: false,
                message: 'token is invalid'
            })
        }

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong while verifying the token'
        })
    }
}


exports.isstudent = (req, res, next) => {
    try {
        if (req.user.role !== 'student') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for students'
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        })
    }
}

exports.isinstructor = (req, res, next) => {
    try {
        if (req.user.role !== 'instructor') {
            return res.status(401).json({
                success: false,
                message: 'This is a protected route for instructors'
            })
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'User role is not matching'
        })
    }
}

