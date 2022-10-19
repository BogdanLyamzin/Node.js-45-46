const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleSaveErrors} = require("../helpers")

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        default: ""
    }
}, {versionKey: false, timestamps: true})

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const verifyEmailSchema = Joi.object({
    email: Joi.string().required(),
})

const schemas = {
    registerSchema,
    loginSchema,
    verifyEmailSchema,
}

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}