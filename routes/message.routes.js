

const {Router} = require('express')
const router = Router()
const messageController = require('../controllers/MessagesController.js')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/:chatId',authMiddleware, messageController.sendMessage)
router.get('/:chatId',authMiddleware, messageController.getChatMessages)

module.exports = router