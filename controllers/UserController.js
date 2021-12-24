const User = require('../models/User')

class UserController {
    async searchUsers(req, res) {
        try {
            const users = await User.find()
            const filteredUsers = users.filter((user) => user._id.toString() !== req.user.userId.toString())
            const newUsers = []
            for (let i = 0; i < filteredUsers.length; i++) {
                newUsers.push({
                    id: filteredUsers[i]._id,
                    username: filteredUsers[i].username,
                    name: filteredUsers[i].name,
                    image: filteredUsers[i].image,
                    surname: filteredUsers[i].surname,
                    role: filteredUsers[i].role,
                    registerDate: filteredUsers[i].registerDate
                })
            }
            return res.status(200).json({users: newUsers})
        } catch (e) {
            return res.status(400).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }

    async profileUser(req, res) {
        try {
            const user = await User.findById(req.user.userId)
            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }

            return res.status(200).json(
                {
                    user:
                        {
                            id: user._id,
                            username: user.username,
                            name: user.name,
                            surname: user.surname,
                            image: user.image,
                            role: user.role,
                            registerDate: user.registerDate
                        }
                })
        } catch (e) {
            return res.status(400).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }

    async editProfileUser(req, res) {
        try {
            const user = await User.findById(req.user.userId)

            if (!user) {
                return res.status(400).json({message: 'User not found'})
            }
            if(req.body.name === '' || req.body.name === ''){
                return res.status(400).json({message: 'Name and Surname can not be empty'})
            }
            user.name = req.body.name
            user.surname = req.body.surname
            await user.save()

            return res.status(200).json({user})

        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new UserController()