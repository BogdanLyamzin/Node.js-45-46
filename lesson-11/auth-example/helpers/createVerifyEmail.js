const {BASE_URL} = process.env;

const createVerifyEmail = (email, verificationToken) => {
    const mail =  {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Нажмите для подтверждения</a>`
    };

    return mail;
}

module.exports = createVerifyEmail;