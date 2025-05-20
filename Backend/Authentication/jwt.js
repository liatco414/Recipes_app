const jwt = require("jsonwebtoken");
require("dotenv").config();

const Secret_Word = process.env.SECRET;

const generateToken = (user) => {
    try {
        payload = {
            _id: user._id,
            isAdmin: user.isAdmin,
            isBlogger: user.isBlogger,
        };

        const token = jwt.sign(payload, Secret_Word, { expiresIn: "4h" });
        return token;
    } catch (error) {
        throw new Error("Failed to create token " + error.message);
    }
};

const verifyToken = (token) => {
    try {
        const payload = jwt.verify(token, Secret_Word);
        return payload;
    } catch (error) {
        throw new Error("Failed to verify token " + error.message);
    }
};

module.exports = { generateToken, verifyToken };
