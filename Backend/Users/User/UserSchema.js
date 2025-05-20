const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
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
});

const userSchema = new mongoose.Schema({
    name: {
        first: { type: String, minLength: 2, maxLength: 256, trim: true, lowercase: true, required: true },
        middle: { type: String, minLength: 0, maxLength: 256, trim: true, lowercase: true },
        last: { type: String, minLength: 2, maxLength: 256, trim: true, lowercase: true, required: true },
    },
    phone: { type: String, required: true, match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/), minLength: 10 },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/) },
    password: { type: String, required: true, minLength: 8, trim: true },
    image: imageSchema,
    isBlogger: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);
module.exports = User;
