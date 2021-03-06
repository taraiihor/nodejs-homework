const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guards')

router.post('/registration', validate.schemaUser, userController.reg)
router.post('/login', validate.schemaUser, userController.login)
router.post('/logout', guard, userController.logout)

module.exports = router
