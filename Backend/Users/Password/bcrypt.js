const bcrypt = require("bcryptjs");

const generatePassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
const comparePasswords = (password, cryptPassword) => {
    return bcrypt.compareSync(password, cryptPassword);
};

module.exports = { generatePassword, comparePasswords };
