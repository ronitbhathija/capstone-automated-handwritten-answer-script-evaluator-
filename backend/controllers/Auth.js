const bcrypt = require("bcrypt");
const User = require("../models/User");
const reviews = require("../models/Reviews");
const jwt = require("jsonwebtoken");

const { spawn } = require('child_process');
// const multer = require('multer');

// const storage = multer.memoryStorage();  // Store the file in memory
// const upload = multer({ storage: storage });

const tesseract = require("node-tesseract-ocr");
const config = {
    lang: "eng",
    oem: 1,
    psm: 3
}


require("dotenv").config();

exports.getallreviews = async (req, res) => {
    try {
        const data = await reviews.find();
        res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "could not fetch all reviews"
        })
    }
}

exports.submitreview = async (req, res) => {
    try {
        const { firstname, lastname, role, review } = req.body;

        const rev = await reviews.create({
            firstname, lastname, role, review
        })

        return res.status(200).json({
            success: true,
            message: 'review submitted',
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Cannot submit review try again later"
        })
    }
}


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

function cleanOcrOutput(text) {
    // Remove consecutive newlines
    text = text.replace(/\r?\n\s*\r?\n/g, '\n');
    // Trim the text
    return text.trim();
}

exports.extracttext = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'no image given'
            });
        }

        const image = req.file.buffer;
        let text = await tesseract.recognize(image, config);

        // Clean the recognized text
        text = cleanOcrOutput(text);
        console.log(text);

        return res.status(200).json({
            success: true,
            data: text
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'error in extracting text'
        });
    }
}



exports.calculatescore = async (req, res) => {
    try {
        const { myanswer, keyanswer } = req.body;

        // console.log(myanswer);
        // console.log(keyanswer);

        // Path to the dummy Python script
        const scriptPath = 'C://webtechnologies//capstone//newbranch//capstone-automated-handwritten-answer-script-evaluator-//backend//machinelearningmodel//similarity_dummy.py';

        const process = spawn('python', [scriptPath, myanswer, keyanswer]);

        // Collect data from the Python script
        let dataString = '';
        process.stdout.on('data', (data) => {
            dataString += data.toString();
        });

        // Handle the end of the Python script execution
        process.stdout.on('end', () => {
            return res.status(200).json({
                success: true,
                data: parseFloat(dataString.trim())  // Convert the string to a float
            });
        });

        // Handle errors from the Python script
        process.stderr.on('data', (data) => {
            console.error(`Python error: ${data}`);
            return res.status(500).json({
                success: false,
                message: 'Error processing similarity'
            });
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Error in calculating score'
        });
    }
}



// exports.extracttext = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'no image given'
//             });
//         }

//         const image = req.file.buffer;
//         const text = await tesseract.recognize(image, config);



//         return res.status(200).json({
//             success: true,
//             data: text
//         });

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: 'error in extracting text'
//         });
//     }
// }
