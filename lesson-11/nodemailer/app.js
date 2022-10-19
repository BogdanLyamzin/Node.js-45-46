const nodemailer = require("nodemailer");
require("dotenv").config();

const {META_PASSWORD} = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465, // 25, 465, 2255
    secure: true,
    auth: {
        user: "bogdan.lyamzin.d@meta.ua",
        pass: META_PASSWORD
    }
};

const transport = nodemailer.createTransport(nodemailerConfig);

const mail = {
    to: "arestovich@gmail.com",
    from: "bogdan.lyamzin.d@meta.ua",
    subject: "Сколько продлится война?",
    html: "2-3 недели"
}

transport.sendMail(mail)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message))