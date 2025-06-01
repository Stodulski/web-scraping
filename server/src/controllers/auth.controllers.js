import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import ApiError from '../utils/apiError.js'
import { validateLogin } from '../services/auth.services.js'

export const login = async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await validateLogin(username, password)
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: '1h'
    })
    res
      .cookie('access_Token', `Bearer ${token}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 15 * 60 * 1000
      })
      .status(200)
      .json({ loggedIn: true })
  } catch (error) {
    next(error)
  }
}

export const checkSession = async (req, res, next) => {
  const bearerToken = req.cookies.access_Token
  if (!bearerToken) {
    throw new ApiError(401, 'Unauthorized: No token provided')
  }
  const token = bearerToken.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      throw new ApiError(401, 'Unauthorized: User not found')
    }
    res.status(200).json({ loggedIn: true })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res) => {
  res.clearCookie('access_Token').json({ loggedIn: false })
}
