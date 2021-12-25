const Car = require('../models/Car')

class CarController{
    async create(req,res){
        try {
            const candidateCar = await Car.findOne( { userId: req.user.userId })
            if (candidateCar) {
                return res.status(400).json({error: 'Машина уже имеется, ты чё, лох, наебать решил ?'})
            }

            const car = new Car({
                title: req.body.title,
                number: req.body.number,
                userId: req.user.userId,
                registerDate: new Date(),
                updatedDate: new Date()
            })
            await car.save()
            return res.status(201).json({car})
        }
        catch (e) {
            return res.status(400).json({error: e.message})
        }
    }
    async getCar(req,res){
        try {
            const car = await Car.findOne( { userId: req.user.userId })
            if (!car) {
                return res.status(200).json({error: 'Машина не найдена'})
            }

            return res.status(201).json({car})
        }
        catch (e) {
            return res.status(400).json({error: e.message})
        }
    }
    async editCar(req,res){
        try {
            const car = await Car.findOne( { userId: req.user.userId })
            if (!car) {
                return res.status(200).json({error: 'Машина не найдена'})
            }
            if(req.body.title === '' || req.body.number === ''){
                return res.status(200).json({error: 'Поля должны быть заполнены'})
            }
            car.title = req.body.title
            car.number = req.body.number
            car.updatedDate = new Date()

            await car.save()

            return res.status(201).json({car})
        }
        catch (e) {
            return res.status(400).json({error: e.message})
        }
    }
}

module.exports = new CarController()