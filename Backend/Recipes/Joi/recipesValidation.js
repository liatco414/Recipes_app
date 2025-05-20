const Joi = require("joi");

const recipeValidation = (recipe) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        subtitle: Joi.string().min(2).max(256).required(),
        recipeContent: Joi.object().keys({
            ingredients: Joi.string().min(2).max(1024).required(),
            instructions: Joi.string().min(2).required(),
        }),
        image: Joi.object().keys({
            url: Joi.string()
                .ruleset.regex(
                    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
                )
                .rule({ message: "Card image must be a valid url" })
                .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
        }),
    });

    return schema.validate(recipe);
};

module.exports = recipeValidation;
