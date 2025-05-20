const Joi = require("joi");

const loginValidation = (user) => {
    const schema = Joi.object({
        email: Joi.string().min(5).email().required().messages({
            "string.email": "Must be a valid email",
            "string.empty": "Email is required",
        }),
        password: Joi.string()
            .min(7)
            .max(20)
            .pattern(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{9,}$/,
                "Password must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters: !@#$%^&*-"
            )
            .required(),
    });

    return schema.validate(user);
};

module.exports = loginValidation;
