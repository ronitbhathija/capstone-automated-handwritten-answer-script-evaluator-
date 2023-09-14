const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.signup = async (req, res) => {
    try {

        //data
        const { firstname, lastname, email, password, role } = req.body;

        //check if existing
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists',
            })
        }

        let hashedpassword;

        try {
            hashedpassword = await bcrypt.hash(password, 10) //10 number of rounds
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password'
            });
        }

        //create entry
        const user = await User.create({
            firstname, lastname, email, password: hashedpassword, role
        })

        return res.status(200).json({
            success: true,
            message: 'User created',
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "user cannot be registered , please try again later"
        })
    }
}

//login
exports.login = async (req, res) => {
    try {

        //data fetch
        const { email, password } = req.body;
        //validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'PLease fill all the details carefully',
            });
        }

        //check for registered user
        let user = await User.findOne({ email });
        //if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        //verify password & generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            //password match
            let token = jwt.sign(payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h",
                });



            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //3 days
                httpOnly: true,
            }

            res.cookie("cookiename", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Logged in successfully',
            });
        }
        else {
            //passwsord do not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Login Failure',
        });

    }
}