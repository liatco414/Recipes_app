const mongoose = require("mongoose");
require("dotenv").config();

const connectionString = process.env.CONNECTION_STRING_ATLAS;

const connectToAtlas = async () => {
    try {
        await mongoose.connect(connectionString);
        console.log("Connected to Atlas");
    } catch (error) {
        throw new Error("Could not connect to MongoDB Atlas: " + error.message);
    }
};

module.exports = connectToAtlas;
