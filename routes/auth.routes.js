const {Router} = require('express')
const router = Router()
const authController = require('../controllers/AuthController.js')

router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router