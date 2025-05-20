const mongoose = require("mongoose");
const express = require("express");
const connectToDb = require("./dataBase/connectionToDb");
const router = require("./Router");
const morgan = require("morgan");
const Users = require("./dataBase/seed/seed_users");
const User = require("./Users/User/UserSchema");
const Recipe = require("./Recipes/Recipe/RecipeSchema");
const Recipes = require("./dataBase/seed/seed_recipes");
const Category = require("./Recipes/Recipe/categoriesSchema");
const Categories = require("./dataBase/seed/seed_categories");
const cors = require("cors");
const loggerMiddleware = require("./Logger/loggerService");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(morgan("tiny"));
app.use(loggerMiddleware());
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://images.unsplash.com"],
    })
);

app.use(router);
app.listen(PORT, async () => {
    console.log("Server listening to port " + PORT);
    connectToDb();
    const userDB = await User.find({});
    const recipeDB = await Recipe.find({});
    const categoryDB = await Category.find({});
    if (userDB.length === 0) {
        await User.insertMany(Users);
    }
    if (recipeDB.length === 0) {
        await Recipe.insertMany(Recipes);
    }
    if (categoryDB.length === 0) {
        await Category.insertMany(Categories);
    }
});
