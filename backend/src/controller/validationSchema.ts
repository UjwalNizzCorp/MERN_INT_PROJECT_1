import Joi from "joi";

export const validateRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

export const validateLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});
