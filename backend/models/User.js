const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },

    lastname: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["instructor", "student"],
    }
});

module.exports = mongoose.model("user", userSchema);



