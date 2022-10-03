const jwt = require("jsonwebtoken");
require("dotenv").config();

const {SECRET_KEY} = process.env;

const payload = {
    id: "633b1a274155e6062810f09a"
}

const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
// console.log(token);

const decodeToken = jwt.decode(token);
// console.log(decodeToken);

const wrongToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2IxYTI3NDE1NWU2MDYyODEwZjA5YSIsImlhdCI6MTY2NDgyMTA1NiwiZXhwIjoxNjY0ODI0NjU2fQ.ephFgxfrPpcG58bPjFdNjj_TROlj43KrqEHmTVuipBe"

try {
    const result1 = jwt.verify(token, SECRET_KEY);
    console.log(result1);
    const result2 = jwt.verify(wrongToken, SECRET_KEY);
    console.log(result2);
} catch (error) {
    console.log(error.message);
}