const {Router} = require('express')
const router = Router()
const chatController = require('../controllers/ChatController.js')
const authMiddleware = require('../middleware/auth.middleware')

router.post('',authMiddleware, chatController.createChat)
router.get('',authMiddleware, chatController.findUserChats)

module.exports = router