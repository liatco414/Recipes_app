const mongoose = require("mongoose");
const Category = require("./categoriesSchema");

const commentsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    comment: { type: String, minLength: 2, maxLength: 1024 },
    date: { type: Date, default: Date.now },
});

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    subtitle: {
        type: String,
        minLength: 2,
        maxLength: 256,
        required: true,
    },
    recipeContent: {
        ingredients: {
            type: String,
            minLength: 2,
            maxLength: 1024,
            required: true,
        },
        instructions: {
            type: String,
            minLength: 2,
            required: true,
        },
    },
    image: {
        url: {
            type: String,
            trim: true,
            lowercase: true,
            match: RegExp(
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
            ),
        },
        alt: {
            type: String,
            minLength: 2,
            maxLength: 256,
            trim: true,
            lowercase: true,
        },
    },
    likes: {
        type: [String],
        default: [],
    },
    comments: [commentsSchema],
    category: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
