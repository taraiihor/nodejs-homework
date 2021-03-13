const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const fs = require('fs').promises
const path = require('path')
const Jimp = require('jimp')
const { HttpCode, Subscriptions } = require('../helpers/constants')
const createFolderIsExist = require('../helpers/create-dir')
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
        user: {
          email: newUser.email,
          avatar: newUser.avatar,
          subscription: newUser.subscription,
        },
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
    const isPasswordValid = await user?.validPassword(password)
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

const updateSub = async (req, res, next) => {
  try {
    const id = req.user.id
    await Users.updateSub(id, req.body.subscription)
    const user = await Users.findById(id)

    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    })
  } catch (error) {
    next(error)
  }
}
const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const avatarUrl = await saveAvatarUrl(req)
    await Users.updateAvatar(id, avatarUrl)
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarUrl: avatarUrl },
    })
  } catch (error) {
    next(error)
  }
}

const saveAvatarUrl = async req => {
  const id = req.user.id
  const PUBLIC_DIR = process.env.PUBLIC_DIR
  const AVATARS_OF_USERS = path.join(PUBLIC_DIR, process.env.AVATARS_OF_USERS)
  const pathFile = req.file.path
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`
  const img = await Jimp.read(pathFile)
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id))
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar))
  const avatarUrl = path.normalize(path.join(id, newNameAvatar))
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatarURL),
    )
  } catch (error) {
    console.log(error.message)
  }
  return avatarUrl
}
module.exports = { reg, login, logout, currentUser, updateSub, avatars }
