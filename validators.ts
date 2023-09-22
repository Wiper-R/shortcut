import Joi from "joi";

export const SignUp_POST = Joi.object({
  username: Joi.string().alphanum().min(4).max(15).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(20).required(),
}).options({ stripUnknown: true, abortEarly: false });

export const Login_POST = Joi.object({
  email_or_username: Joi.string().required(),
  password: Joi.string().required(),
});
