const User = require('./schemas/user')

const findByEmail = async email => {
  return await User.findOne({ email })
}

const findById = async id => {
  return await User.findOne({ _id: id })
}
const findByVerifyToken = async verifyToken => {
  return await User.findOne({ verifyToken })
}
const create = async ({
  name,
  email,
  password,
  subscription,
  verify,
  verifyToken,
}) => {
  const user = new User({
    name,
    email,
    password,
    subscription,
    verify,
    verifyToken,
  })
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}
const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verify, verifyToken }) // [1]
}
const findByToken = async token => {
  return await User.findOne({ token })
}
const updateSub = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription })
}
const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL })
}
module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  findByToken,
  updateSub,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
}
