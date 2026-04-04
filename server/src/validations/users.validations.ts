import joi from 'joi'

export const userValidation = joi.object({
  email: joi
    .string()
    .email({
      tlds: { allow: false }, // allows all domains (gmail.com, etc.)
    })
    .min(3)
    .max(50)
    .required(),
  username: joi.string().required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  confirm_password: joi.any().valid(joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
  }),
  lastname: joi.string().required().alphanum(),
  firstname: joi.string().required().alphanum(),
  is_active: joi.boolean().required().default(true),
  is_verified: joi.boolean().required().default(false),
});

export const userLoginValidation = joi
  .object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .trim(),
    username: joi.string().min(3).trim().empty(""),
    password: joi.string().required(),
  })
  .xor("email", "username")
  .messages({
    "object.missing": "Provide either email or username",
    "any.required": "Password is required",
  });;