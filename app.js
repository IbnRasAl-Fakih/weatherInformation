const express = require("express");
const mongoose = require("mongoose");
const app = express();
const POST = 3000;
const dbURL = "mongodb+srv://boiiian:ReYNLTEMgzwLJFxX@cluster0.vf03xwt.mongodb.net/?retryWrites=true&w=majority";

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect(dbURL).then( () => {
    console.log("Connected to db");
}).catch( (error) => {
    console.log("Error: ", error);
});

app.use("", require("./routes/routes"));

app.listen(POST, () => {
    console.log("server is started");
});