const {Router} = require('express')
const router = Router()
const userController = require('../controllers/UserController.js')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/search', authMiddleware, userController.searchUsers)
router.get('/profile', authMiddleware, userController.profileUser)
router.put('/edit', authMiddleware, userController.editProfileUser)

module.exports = router