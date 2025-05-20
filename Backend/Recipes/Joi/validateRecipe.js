const recipeValidation = require("./recipesValidation");
const config = require("config");

let validator = config.get("VALIDATOR");

const validateRecipe = (user) => {
    if (validator === "joi") {
        const { error } = recipeValidation(user);
        if (error) {
            return error.details.map((err) => err.message);
        }
        return null;
    }
};

module.exports = validateRecipe;
