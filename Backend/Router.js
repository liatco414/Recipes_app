const express = require("express");
const router = express.Router();
const recipePath = require("./Recipes/routes/recipePath");
const userPath = require("./Users/routes/usersPath");
const categoryPath = require("./Recipes/routes/categoriesPath");

router.use("/recipes", recipePath);
router.use("/users", userPath);
router.use("/categories", categoryPath);

module.exports = router;
