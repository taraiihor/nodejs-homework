const Contacts = require('../model/index')

const getContact = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id)
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
    const contact = await Contacts.addContact(req.body)
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } })
  } catch (e) {
    next(e)
  }
}

const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id)
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
    const contact = await Contacts.updateContact(req.params.id, req.body)
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
