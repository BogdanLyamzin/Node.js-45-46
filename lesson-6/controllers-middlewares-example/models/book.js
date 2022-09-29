const {Schema, model} = require("mongoose");
const Joi = require("joi");

const {handleSaveErrors} = require("../middlewares");

const genres = ["fantastic", "love"];
const isbnRegexp = /^\d{3}-\d-\d{3}-\d{5}-\d$/

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    genre: {
        type: String,
        enum: genres,
        required: true,
    },
    isbn: {
        type: String,
        required: true,
        match: isbnRegexp,
        unique: true,
    }
}, {versionKey: false, timestamps: true});



bookSchema.post("save", handleSaveErrors)

const addSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    favorite: Joi.boolean(),
    genre: Joi.string().valid(...genres),
    isbn: Joi.string().pattern(isbnRegexp).required()
})

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema,
    updateFavoriteSchema,
}

const Book = model("book", bookSchema);
// categories => category
// mice => mouse

module.exports = {
    Book,
    schemas,
};