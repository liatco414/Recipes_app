const express = require("express");
const { newCategories, getAllCategories, getCategoryById, deleteCategory, updateCategory } = require("../recipeService/categoriesAccessData");
const e = require("express");
const Auth = require("../../Authentication/auth_service");
const router = express.Router();

router.post("/", Auth, async (req, res) => {
    try {
        const userData = req.user;
        if (userData.isAdmin === true) {
            const category = await newCategories(req.body);
            res.status(201).send(category);
        } else {
            res.status(403).send("Authentication Error: Only admins are allowed to add categories");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const categories = await getAllCategories(req.body);
        res.status(200).send(categories);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const category = await getCategoryById(id);
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", Auth, async (req, res) => {
    try {
        const userData = req.user;
        let { id } = req.params;
        if (userData.isAdmin === true) {
            const category = await deleteCategory(id);
            res.status(200).send(category);
        } else {
            res.status(403).send("Authentication Error: Only admins are allowed to delete categories");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const category = await updateCategory(id, req.body);
        res.status(200).send(category);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
