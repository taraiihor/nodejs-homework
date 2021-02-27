const express = require('express')
const router = express.Router()
// const Contacts = require('../../model/index')
const contactsController = require('../../controllers/contacts')
const validate = require('./validation')

router.get('/', contactsController.getContact)
router.get('/:id', contactsController.getContactById)
router.post('/', validate.create, contactsController.createContact)
router.patch('/:id', validate.update, contactsController.updateContact)
router.delete('/;id', contactsController.deleteContact)

// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await Contacts.listContacts()
//     return res.json({ status: 'success', code: 200, data: { contacts } })
//   } catch (e) {
//     next(e)
//   }
// })

// router.get('/:id', async (req, res, next) => {
//   try {
//     const contact = await Contacts.getContactById(req.params.id)
//     if (contact) {
//       return res.json({ status: 'success', code: 200, data: { contact } })
//     } else {
//       return res.status(404).json({
//         status: 'error',
//         code: 404,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     next(e)
//   }
// })

// router.post('/', validate.create, async (req, res, next) => {
//   try {
//     const contact = await Contacts.addContact(req.body)
//     return res
//       .status(201)
//       .json({ status: 'success', code: 201, data: { contact } })
//   } catch (e) {
//     next(e)
//   }
// })
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const contact = await Contacts.removeContact(req.params.id)
//     if (contact) {
//       return res.json({ status: 'success', code: 200, data: 'contact deleted' })
//     } else {
//       return res.status(404).json({
//         status: 'error',
//         code: 404,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     next(e)
//   }
// })
// router.patch('/:id', validate.update, async (req, res, next) => {
//   try {
//     const contact = await Contacts.updateContact(req.params.id, req.body)
//     if (contact) {
//       return res.json({ status: 'success', code: 200, data: { contact } })
//     } else {
//       return res.status(404).json({
//         status: 'error',
//         code: 404,
//         data: 'Not Found',
//       })
//     }
//   } catch (e) {
//     next(e)
//   }
// })

module.exports = router
