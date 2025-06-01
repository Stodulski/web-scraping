import ApiError from "../utils/apiError.js"
export const validateBody = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new ApiError(400, error.message)
    }
    next()
  }
}
