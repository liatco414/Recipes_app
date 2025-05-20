const connectToLocalDb = require("./mongoDBlocally");
const connectToAtlas = require("./mongoDBatlas");
const config = require("config");
let DB = config.get("ENVIRONMENT");

const connectToDb = async () => {
    if (DB === "development") {
        await connectToLocalDb();
    } else if (DB === "production") {
        await connectToAtlas();
    }
};

module.exports = connectToDb;
