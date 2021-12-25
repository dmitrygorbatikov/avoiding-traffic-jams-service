const {Router} = require('express')
const router = Router()
const carController = require('../controllers/CarController.js')
const authMiddleware = require('../middleware/auth.middleware')

router.post('', authMiddleware, carController.create)
router.get('', authMiddleware, carController.getCar)
router.put('', authMiddleware, carController.editCar)

module.exports = router