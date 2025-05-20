const mongoose = require("mongoose");

const connectToLocalDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Recipe_Server");
        console.log("Connected to DB locally");
    } catch (error) {
        throw new Error(error, "could not connect to local db");
    }
};

module.exports = connectToLocalDb;
