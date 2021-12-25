const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const functions = require('../helpers/functions')

class AuthController{
    async register(req,res){
        try {
            const candidate = await User.findOne( { username: req.body.username })
            if (candidate) {
                return res.status(400).json({error: 'Такой пользователь уже существует'})
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 12)

            const user = new User({
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                password: hashedPassword,
                role: 'user',
                online: false,
                lat: functions.getLat(),
                lng: functions.getLng(),
                lastSeen: new Date(),
                registerDate: new Date()
            })
            await user.save()
            const token = jwt.sign(
                { userId: user._id },
                config.get('jwtSecret')
            )
            return res.status(201).json({token})
        }
        catch (e) {
            return res.status(400).json({error: e.message})
        }
    }

    async login(req,res){
        try {
            const {username, password} = req.body

            const user = await User.findOne({username})

            if(!user){
                return res.status(400).json({error:'Пользователь не найден'})
            }
            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({error:'Неверный пароль, попробуйте снова'})
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret')
            )
            return res.status(200).json({token})
        }
        catch (e) {
            return res.status(400).json({error:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new AuthController()