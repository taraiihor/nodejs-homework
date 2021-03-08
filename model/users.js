const User = require('./schemas/user')

const findByEmail = async email => {
  return await User.findOne({ email })
}

const findById = async id => {
  return await User.findOne({ _id: id })
}

const create = async ({ email, password, subscription }) => {
  const user = new User({ email, password, subscription })
  return await user.save()
}

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token })
}
const findByToken = async token => {
  return await User.findOne({ token })
}
const updateSub = async (id, subscription) => {
  return await User.updateOne({ _id: id }, { subscription })
}
module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  findByToken,
  updateSub,
}
