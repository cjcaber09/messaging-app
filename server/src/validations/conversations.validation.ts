import joi from "joi";

export const conversationsValidation = joi.object({
  sender_id: joi.string().uuid().required(),
  members: joi
    .array()
    .items(
      joi.object({
        user_id: joi.string().uuid().required(),
      }),
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Members must be an array",
      "array.min": "At least one member is required",
      "any.required": "Members field is required",
    }),
});
