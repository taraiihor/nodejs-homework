const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { HttpCode, Subscriptions } = require('../helpers/constants')

require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET

const reg = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await Users.findByEmail(email)
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        data: 'Conflict',
        message: 'email is already use',
      })
    }
    const newUser = await Users.create(req.body)
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      data: {
        user: { email: newUser.email, subscription: newUser.subscription },
      },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isPasswordValid = await user.validPassword(password)
    if (!user || !isPasswordValid) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        data: 'unauthorized',
        message: 'Email in use',
      })
    }
    const id = user._id
    const payload = { id }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(id, token)
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email,
          subscription: Subscriptions.FREE,
        },
      },
    })
  } catch (e) {
    next(e)
  }
}
const logout = async (req, res, next) => {
  const userId = req.user.id
  await Users.updateToken(userId, null)
  return res.status(HttpCode.NO_CONTENT).json({ message: 'Nothing' })
}
const currentUser = async (req, res, next) => {
  try {
    const token = req.user.token
    const user = await Users.findByToken(token)

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: 'OK',
      body: {
        email: user.email,
        subscription: user.subscription,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { reg, login, logout, currentUser }
