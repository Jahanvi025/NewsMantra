import Joi from "joi";

const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ 
            message: "Validation failed", 
            errors: error.details.map(err => err.message) 
        });
    }

    next();
};
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(100).required(),
    });

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({ 
            message: "Validation failed", 
            errors: error.details.map(err => err.message) 
        });
    }

    next();
};

export { registerValidation, loginValidation };
