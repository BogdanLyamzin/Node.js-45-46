const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const mail = {
    to: "arestovich@gmail.com",
    from: "bogdan.lyamzin.d@gmail.com",
    subject: "Сколько продлится война?",
    html: "2-3 недели"
}

sgMail.send(mail)
    .then(()=> console.log("Mail send success"))
    .catch(error => console.log(error.message))