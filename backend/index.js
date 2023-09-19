const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));  // replace with your frontend's address


require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

const user = require("./routes/user");
app.use("/api/v1", user);


app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})

