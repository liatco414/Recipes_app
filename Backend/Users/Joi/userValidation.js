const loginValidation = require("./loginValidation");
const userRegisterValidation = require("./registerValidation");
const config = require("config");

const validator = config.get("VALIDATOR");

const validateRegister = (user) => {
    if (validator === "joi") {
        const { error } = userRegisterValidation(user);
        if (error) {
            return error.details.map((err) => err.message);
        }
        return null;
    }
};

const validateLogin = (user) => {
    if (validator === "joi") {
        const { error } = loginValidation(user);
        if (error) {
            return error.details.map((err) => err.message);
        }
        return null;
    }
    return null;
};

module.exports = { validateRegister, validateLogin };
