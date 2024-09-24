import Joi from 'joi';

const loginSchema = {
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .pattern(new RegExp(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/))
        .required()
        .messages({
            'string.pattern.base': 'The password must be at least seven characters long and contain an uppercase letter, a lowercase letter, a number, and one of the following characters !@#$%^&*-',
            'any.required': 'Password is required'
        })
};

export default loginSchema;