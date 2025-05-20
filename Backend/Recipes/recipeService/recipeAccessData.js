const Recipe = require("../Recipe/RecipeSchema");
const User = require("../../Users/User/UserSchema");

const createRecipe = async (newRecipe, userId) => {
    try {
        const recipe = new Recipe(newRecipe, userId);
        return await recipe.save();
    } catch (error) {
        throw new Error("Couldn't create new recipe " + error.message);
    }
};

const getAllRecipes = async () => {
    try {
        const recipes = await Recipe.find({});
        return recipes;
    } catch (error) {
        throw new Error("Couldn't get recipes " + error.message);
    }
};

const getRecipeById = async (recipeId) => {
    try {
        const recipe = await Recipe.findById(recipeId);
        return recipe;
    } catch (error) {
        throw new Error("Couldn't find recipe " + error.message);
    }
};

const getMyRecipes = async (userId) => {
    try {
        const myRecipe = await Recipe.find({ user_id: userId });
        return myRecipe;
    } catch (error) {
        throw new Error("Couldn't get your recipes " + error.message);
    }
};

const updateRecipe = async (recipeId, newData) => {
    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, newData);
        return await recipe.save();
    } catch (error) {
        throw new Error("Couldn't updpate recipe " + error.message);
    }
};

const favRecipes = async (recipeId, userId) => {
    try {
        const recipeLike = await Recipe.findById(recipeId);
        if (recipeLike.likes.includes(userId)) {
            let recipe = recipeLike.likes.filter((id) => id != userId);
            recipeLike.likes = recipe;
        } else {
            recipeLike.likes.push(userId);
        }
        await recipeLike.save();
        return recipeLike;
    } catch (error) {
        throw new Error("Couldn't save card in favorites " + error.message);
    }
};

const recipeComment = async (recipeId, userId, comment) => {
    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        recipe.comments.push({
            userId: userId,
            comment: comment,
            date: new Date(),
        });
        return await recipe.save();
    } catch (error) {
        throw new Error("Couldn't add comment: " + error.message);
    }
};

const getCommentByRecipeId = async (recipeId) => {
    try {
        const recipe = await Recipe.findById(recipeId).populate("comments.userId", "name", "users");
        return recipe.comments.map((comment) => ({
            ...comment.toObject(),
            username: comment.userId?.name?.first + " " + comment.userId?.name?.last,
        }));
    } catch (error) {
        throw new Error("Comment not found" + error.message);
    }
};

const deleteComment = async (recipeId, commentId, userId) => {
    try {
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            throw new Error("Recipe not found");
        }

        const comment = recipe.comments.find((c) => c._id.toString() === commentId);

        if (!comment) {
            throw new Error("Comment not found");
        }

        if (comment.userId.toString() === userId.toString()) {
            recipe.comments = recipe.comments.filter((c) => c._id.toString() !== commentId);
            return await recipe.save();
        } else {
            throw new Error("You are not authorized to delete this comment");
        }
    } catch (error) {
        throw new Error("Couldn't delete comment: " + error.message);
    }
};

const deleteRecipe = async (recipeId) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(recipeId);
        return recipe;
    } catch (error) {
        throw new Error("Couldn't delete recipe " + error.message);
    }
};

const getRecipeByCategory = async (categoryId) => {
    try {
        const recipe = await Recipe.find({ category: categoryId });
        return recipe;
    } catch (error) {
        throw new Error("Couldn't bring the recipes " + error.message);
    }
};

module.exports = { createRecipe, getAllRecipes, getRecipeById, getMyRecipes, updateRecipe, favRecipes, recipeComment, deleteRecipe, deleteComment, getRecipeByCategory, getCommentByRecipeId };
