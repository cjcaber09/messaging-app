//   id              UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
//   conversation_id UUID           NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
//   sender_id       UUID           NOT NULL REFERENCES users(id),
//   parent_id       UUID           REFERENCES messages(id),        -- reply/thread
//   content         TEXT,
//   message_type    message_type   NOT NULL DEFAULT 'text',
//   status          message_status NOT NULL DEFAULT 'sending',

import Joi from "joi";

export const messageValidation = Joi.object({
  conversation_id: Joi.string().uuid().required(),
  parent_id: Joi.string().uuid().optional(),
  content: Joi.string().min(1).max(200).required(),
  message_type: Joi.string().valid("text", "image"),
  status: Joi.string(),
});
