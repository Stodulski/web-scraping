import joi from 'joi'

export const authSchema = joi.object({
  username: joi.string().min(1).max(30).required().messages({
    'string.empty': 'Username cannot be empty'
  }),
  password: joi.string().min(1).max(100).required().messages({
    'string.empty': 'Password cannot be empty'
  })
})
