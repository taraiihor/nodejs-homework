const Contact = require('./schemas/contact')

const listContacts = async (userId, { sub, limit = '5', page = '1' }) => {
  const results = await Contact.paginate(
    { owner: userId },
    {
      limit,
      page,
      select: sub ? sub.split('|').join(' ') : '',
      populate: {
        path: 'owner',
        select: 'email subscription -_id',
      },
    },
  )
  const { docs: contacts, totalDocs: total } = results
  return { total: total.toString(), limit, page, contacts }
}

const getContactById = async (id, userId) => {
  const result = await Contact.findOne({ _id: id, owner: userId }).populate({
    path: 'owner',
    select: 'email subscription -_id',
  })
  return result
}

const removeContact = async (id, userId) => {
  const result = await Contact.findOneAndRemove({ _id: id, owner: userId })
  return result
}

const addContact = async body => {
  const result = await Contact.create(body)
  return result
}

const updateContact = async (id, body, userId) => {
  const result = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true },
  )
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
