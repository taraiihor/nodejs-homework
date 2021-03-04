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

module.exports = router
