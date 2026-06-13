import Joi from "joi";

export const forgotValidation = Joi.object({
  email: Joi.string().trim().email().required().messages({
    "string.empty": "required",
    "string.email": "wrong format",
  }),
});
