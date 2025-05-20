const express = require("express");
const {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    getMyRecipes,
    updateRecipe,
    favRecipes,
    deleteRecipe,
    recipeComment,
    deleteComment,
    getRecipeByCategory,
    getCommentByRecipeId,
} = require("../recipeService/recipeAccessData");
const Auth = require("../../Authentication/auth_service");
const validateRecipe = require("../Joi/validateRecipe");
const router = express.Router();

router.post("/", Auth, async (req, res) => {
    try {
        const userData = req.user;
        if (userData.isBlogger === true || userData.isAdmin === true) {
            validateRecipe(req.body);
            req.body.user_id = userData._id;
            const savedRecipe = await createRecipe(req.body);
            res.status(201).send(savedRecipe);
        } else {
            res.status(403).send("Authentication Error: Only blogger users or admin are allowed to post new recipe.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        const getRecipe = await getAllRecipes(req.body);
        res.status(200).send(getRecipe);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        const recipe = await getRecipeById(id);
        res.status(200).send(recipe);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/my-recipes/:userId", Auth, async (req, res) => {
    try {
        const userData = req.user;
        let { userId } = req.params;
        if (userData._id === userId && userData.isBlogger === true) {
            const recipe = await getMyRecipes(userId);
            res.status(200).send(recipe);
        } else {
            res.status(401).send("Authentication Error: Only bloggers who created these posts are authorized for this page.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", Auth, async (req, res) => {
    try {
        userData = req.user;
        let is_admin = userData.isAdmin;
        let { id } = req.params;
        let { user_id } = req.body;
        if ((userData._id === user_id && userData.isBlogger === true) || is_admin === true) {
            const recipeUpdate = await updateRecipe(id, req.body);
            res.status(200).send(recipeUpdate);
        } else {
            res.status(403).send("Authentication Error: Only the user who created this post is able to edit it.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", Auth, async (req, res) => {
    try {
        let token = req.headers["x-auth-token"];
        let { id } = req.params;
        let likes = req.body.likes;

        if (token) {
            const recipe = await favRecipes(id, likes);
            res.status(200).send(recipe);
        } else {
            res.status(403).send("Authentication Error: Only registered users are allowed to save this post");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/comments/:id", Auth, async (req, res) => {
    try {
        let token = req.headers["x-auth-token"];
        let { id } = req.params;
        const { comments } = req.body;
        const userId = req.user._id;
        if (token) {
            comments.forEach(async (comment) => {
                await recipeComment(id, userId, comment.comment);
            });
            res.status(200).send("Comment added successfully!");
        } else {
            res.status(403).send("Authentication Error: Only registered users are allowed to leave a comment");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/comments/:recipeId/:commentId", Auth, async (req, res) => {
    try {
        let token = req.headers["x-auth-token"];
        let { recipeId, commentId } = req.params;
        const userId = req.user._id;

        if (token) {
            const recipe = await deleteComment(recipeId, commentId, userId);
            res.status(200).send(recipe);
        } else {
            res.status(403).send("Authentication Error: Only registered users are allowed to delete a comment");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:recipeId/comments", async (req, res) => {
    try {
        const { recipeId } = req.params;
        const comments = await getCommentByRecipeId(recipeId);
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", Auth, async (req, res) => {
    try {
        const userData = req.user;
        let { id } = req.params;
        let { user_id } = req.body;
        if ((userData.isBlogger === true && userData._id === user_id) || userData.isAdmin === true) {
            let recipe = await deleteRecipe(id);
            res.status(200).send(recipe);
        } else {
            res.sendStatus(403).send("Authentication Error: only bloggers who have access to their post OR admin can delete it.");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:categoryId/recipes-by-category", async (req, res) => {
    try {
        const { categoryId } = req.params;
        const recipes = await getRecipeByCategory(categoryId);
        res.status(200).send(recipes);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
