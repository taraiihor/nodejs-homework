const express = require('express')
const router = express.Router()
const validate = require('./validation')
const userController = require('../../../controllers/users')
const guard = require('../../../helpers/guards')
const upload = require('../../../helpers/upload')

router.post('/auth/register', validate.schemaUser, userController.reg)
router.post('/auth/login', validate.schemaUser, userController.login)
router.post('/auth/logout', guard, userController.logout)
router.get('/current', guard, userController.currentUser)
router.patch('/', guard, userController.updateSub)
router.patch(
  '/avatars',
  [guard, upload.single('avatar'), validate.updateAvatar],
  userController.avatars,
)

router.get('/verify/:token', userController.verify)
module.exports = router
