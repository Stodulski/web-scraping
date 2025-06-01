import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const bearerToken = req.cookies.access_Token
  if (!bearerToken) {
    return res.status(401).json({ text: 'Unauthorized' })
  }
  const token = bearerToken.split(' ')[1]
  const decoded = jwt.verify(token, process.env.SECRET)
  if (!decoded) {
    return res.status(401).json({ text: 'Unauthorized' })
  }
  req.user = decoded
  next()
}

export default verifyToken
