const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 100,
    },
    description: {
        type: String,
        minLength: 2,
        maxLength: 500,
        trim: true,
    },
    createdAt: { type: Date, default: Date.now },
    image: {
        url: {
            type: String,
            trim: true,
            lowercase: true,
            match: RegExp(/(https?:\/\/[^\s]+)/),
        },
        alt: {
            type: String,
            minLength: 2,
            maxLength: 256,
            trim: true,
            lowercase: true,
        },
    },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
