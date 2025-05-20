const { generateToken } = require("../../Authentication/jwt");
const { generatePassword, comparePasswords } = require("../Password/bcrypt");
const User = require("./UserSchema");

const addUser = async (newUser) => {
    try {
        newUser.password = generatePassword(newUser.password);
        const user = new User(newUser);
        await user.save();
    } catch (error) {
        throw new Error("couldnt create new user " + error);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error("cant upload users " + error);
    }
};

const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error("Couldn't find user " + error);
    }
};

const updateUser = async (userId, newUser) => {
    try {
        const user = await User.findByIdAndUpdate(userId, newUser);
        await user.save();
        return user;
    } catch (error) {
        throw new Error("couldn't update user " + error);
    }
};

const deleteUser = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        return user;
    } catch (error) {
        throw new Error("couldn't delete user " + error);
    }
};

const loginUser = async (email, password) => {
    try {
        const confirmedUser = await User.findOne({ email });
        if (!confirmedUser) {
            throw new Error("User does not exist, please register first");
        }
        let confirmedPassword = comparePasswords(password, confirmedUser.password);
        if (!confirmedPassword) {
            throw new Error("Password or Email are incorrect please again");
        }
        const token = generateToken(confirmedUser);
        return token;
    } catch (error) {
        throw new Error("User does not exist " + error.message);
    }
};

const bloggerUser = async (userId, isBlogger) => {
    try {
        let user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.isBlogger = isBlogger;
        user = await user.save();
        return user;
    } catch (error) {
        throw new Error(`Failed to update user blogger status: ${error.message}`);
    }
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser, bloggerUser };
