import User from '../models/User.js'
import ApiError from '../utils/apiError.js'
export const validateLogin = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    throw new ApiError(401, 'Invalid Username')
  }
  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new ApiError(401, 'Incorrect password')
  }
  return user
}
