const express = require("express");
const { addUser, getAllUsers, getUserById, updateUser, deleteUser, loginUser, bloggerUser } = require("../User/usersAccessData");
const Auth = require("../../Authentication/auth_service");
const { validateRegister, validateLogin } = require("../Joi/userValidation");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const validUser = validateRegister(req.body);
        if (validUser) {
            return res.status(400).send({ error: validUser });
        }
        const user = await addUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", Auth, async (req, res) => {
    try {
        let userData = req.user;
        if (userData.isAdmin === true) {
            const users = await getAllUsers(req.body);
            res.status(201).send(users);
        } else {
            res.status(403).send("Authentication Error: User Unauthorized.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", Auth, async (req, res) => {
    try {
        let userData = req.user;
        let { id } = req.params;
        if (userData._id === id || userData.isAdmin === true) {
            const user = await getUserById(id);
            res.status(200).send(user);
        } else {
            res.status(401).send("Authentication Error: Only Registered User Or Admin Are Able To Get This Information");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", Auth, async (req, res) => {
    try {
        let userData = req.user;
        let { id } = req.params;
        if (userData._id === id) {
            const user = await updateUser(id, req.body);
            res.status(200).send(user);
        } else {
            res.status(403).send("Authentication Error: User's ID is not matching with user's data please try to login");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", Auth, async (req, res) => {
    try {
        let userData = req.user;
        let { id } = req.params;
        if (userData._id === id || userData.isAdmin === true) {
            const user = await deleteUser(id);
            res.status(200).send(user);
        } else {
            res.status(403).send("Authentication Error: Only the registered user or Admin can delete this user.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        const validationError = validateLogin(req.body);
        if (validationError) {
            return res.status(400).send({ error: validationError });
        }
        const token = await loginUser(email, password);
        if (!token) {
            return res.status(400).send({ error: "Authentication failed" });
        }
        res.status(200).send(token);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.patch("/:id", async (res, req) => {
    try {
        let { id } = req.params;
        let { isBlogger } = req.body;
        const user = await bloggerUser(id, isBlogger);
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
