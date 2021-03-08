const Contacts = require('../model/index')

const getContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contacts = await Contacts.listContacts(userId, req.query)
    return res.json({ status: 'success', code: 200, data: { ...contacts } })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.getContactById(req.params.id, userId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const createContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.addContact({ ...req.body, owner: userId })
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.removeContact(req.params.id, userId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: 'contact deleted' })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const userId = req.user.id
    const contact = await Contacts.updateContact(
      req.params.id,
      req.body,
      userId,
    )
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact } })
    } else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getContact,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
}
