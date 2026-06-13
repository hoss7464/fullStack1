import Joi from "joi";

export const loginValidation = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "required",
    "string.email": "wrong format",
  }),

  password: Joi.string()
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d#@!$%&*()]{8,30}$/)
    .required()
    .messages({
      "string.empty": "required",
      "string.pattern.base": "wrong pattern",
    }),
});
