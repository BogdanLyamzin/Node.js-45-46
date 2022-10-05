/*
1. Извлекает заголовок Authorization из req.headers.
2. Разделяет заголовок на 2 слова.
3. Если первое слово !== "Bearer" - выбрасывает 401 ошибку.
4. Проверить что токен валиден. Если нет - выбросить 401 ошибку.
5. Ищем в базе пользователя с таким id. Если нет - выбрасываем 401 ошибку.
*/

const jwt = require("jsonwebtoken");

const {User} = require("../models/user")

const {RequestError} = require("../helpers")

const {SECRET_KEY} = process.env;

const authenticate = async(req, res, next)=> {
    try {
        const {authorization = ""} = req.headers;
        const [bearer = "", token = ""] = authorization.split(" ");
        if(bearer !== "Bearer") {
            throw RequestError(401);
        }
        try {
            const {id} = jwt.verify(token, SECRET_KEY)
            const user = await User.findById(id);
            if(!user || !user.token) {
                throw Error("Unauthorized")
            }
            req.user = user;
            next()
        }
        catch(error) {
            throw RequestError(401, error.message);
        }
    } catch (error) {
        next(error)
    }
} 

module.exports = authenticate;