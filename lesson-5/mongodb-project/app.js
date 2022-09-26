const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const {DB_HOST} = process.env;

console.log(DB_HOST);

mongoose.connect(DB_HOST)
    .then(() => console.log("Datanse connect success"))
    .catch(error => console.log(error.message))