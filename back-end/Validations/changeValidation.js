import Joi from "joi";

export const changeValidation = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "required",
    "string.email": "wrong format",
  }),

  oldPassword: Joi.string()
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d#@!$%&*()]{8,30}$/)
    .required()
    .messages({
      "string.empty": "required",
      "string.pattern.base": "wrong pattern",
    }),
  confirmOldPassword: Joi.any().valid(Joi.ref("oldPassword")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "required",
  }),
  newPassword: Joi.string()
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d#@!$%&*()]{8,30}$/)
    .required()
    .messages({
      "string.empty": "required",
      "string.pattern.base": "wrong pattern",
    }),
  confirmNewPass: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "Passwords do not match",
    "any.required": "required",
  }),
});
