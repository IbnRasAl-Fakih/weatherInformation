const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const POST = 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGO_URL).then( () => {
    console.log("Connected to db");
}).catch( (error) => {
    console.log("Error: ", error);
});

app.use("", require("./routes/routes"));

app.listen(POST, () => {
    console.log("server is started");
});