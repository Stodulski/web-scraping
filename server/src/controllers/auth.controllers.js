import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username' })
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password' })
    }
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
      .json({ loggedIn: true })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const checkSession = async (req, res) => {
  const bearerToken = req.cookies.access_Token
  if (!bearerToken) {
    return res.status(200).json({ loggedIn: false })
  }
  const token = bearerToken.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ loggedIn: false })
    }
    res.status(200).json({ loggedIn: true })
  } catch (error) {
    res.status(401).json({ loggedIn: false })
  }
}

export const logout = async (req, res) => {
  res.clearCookie('access_Token').json({ loggedIn: false })
}
