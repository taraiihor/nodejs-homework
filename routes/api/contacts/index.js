const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../../controllers/contacts')
const guard = require('../../../helpers/guards')

router.get('/', guard, contactsController.getContact)
router.get('/:id', guard, contactsController.getContactById)
router.post('/', guard, validate.create, contactsController.createContact)
router.patch('/:id', guard, validate.update, contactsController.updateContact)
router.delete('/:id', guard, contactsController.deleteContact)

module.exports = router
