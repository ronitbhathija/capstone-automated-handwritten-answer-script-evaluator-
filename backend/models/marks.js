const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },

    paper_id: {
        type: String,
        required: true,
    },

    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    }
});

module.exports = mongoose.model("marks", marksSchema);