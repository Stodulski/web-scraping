import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)
    this.password = hash
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}



const User = mongoose.model('User', userSchema)
User.create({ username: 'admin', password: 'admin' })
  .then(() => {
    console.log('✅ Usuario "admin" creado con contraseña "admin"')
  })
  .catch(err => {
    if (err.code === 11000) {
      console.log('⚠️ Usuario "admin" ya existe — no se creó de nuevo')
    } else {
      console.error('❌ Error al crear admin:', err)
    }
  })
export default User
