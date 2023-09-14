const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    // console.log(process.env.mongodburl)
    mongoose.connect(process.env.mongodburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

        .then(() => { console.log("DB connected") })
        .catch((err) => {
            console.log("db connection failed");
            console.log(err);
            process.exit(1);
        });
}