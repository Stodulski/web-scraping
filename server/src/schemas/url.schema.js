import joi from 'joi';

export const urlSchema = joi.object({
    url: joi.string().uri().required().messages({
        'string.uri': 'Invalid URL format',
        'string.empty': 'URL cannot be empty'
    }),
})