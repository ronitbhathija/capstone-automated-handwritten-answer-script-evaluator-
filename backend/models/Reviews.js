const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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
    role: {
        type: String,
        enum: ["instructor", "student"]
    },
    review: {

    }
});

module.exports = mongoose.model("reviews", reviewSchema);