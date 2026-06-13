import Joi from "joi";

export const registerValidation = Joi.object({
  username: Joi.string().trim()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9#@!$%&*()]{2,30}$/)
    .required()
    .messages({
      "string.empty": "required",
      "string.pattern.base": "wrong pattern",
    }),

  email: Joi.string().trim().email().required().messages({
    "string.empty": "required",
    "string.email": "wrong format",
  }),

  phone: Joi.string().trim()
    .pattern(/^\+[1-9]\d{9,14}$/)
    .max(15)
    .required()
    .messages({
      "string.empty": "required",
      "string.pattern.base": "wrong pattern",
    }),

  password: Joi.string().trim()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d#@!$%&*()]{8,30}$/)
    .required()
    .messages({
      "string.empty": "required",
      "string.pattern.base": "wrong pattern",
    }),

  confirmPass: Joi.any().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "required",
  }),
});
