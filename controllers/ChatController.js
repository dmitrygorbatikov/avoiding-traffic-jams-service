const ChatRoutes = require('../models/Chat')
const User = require('../models/User')

class ChatController{
    async createChat(req,res) {
        try{
            const chatCreatorId = req.user.userId
            const {secondUserId} = req.query
            if(chatCreatorId === secondUserId){
                return res.status(400).json({message: "Вы не можете создать чат с самим собой"})
            }
            const secondUser = await User.findById(secondUserId)
            const chatCreator = await User.findById(chatCreatorId)
            if(!secondUser){
                return res.status(400).json({message: 'User not found'})
            }
            if(!chatCreator){
                return res.status(400).json({message: 'User not found'})
            }
            const candidateChat = await ChatRoutes.findOne({ $or: [ { chatCreatorId, secondUserId}, { chatCreatorId: secondUserId, secondUserId: chatCreatorId }] })

            if(!candidateChat){
                const chat = new ChatRoutes({
                    chatCreatorName:chatCreator.name,
                    chatCreatorSurname:chatCreator.surname,
                    chatCreatorUsername:chatCreator.username,
                    chatCreatorImage:chatCreator.image,
                    secondUserName: secondUser.name,
                    secondUserSurname: secondUser.surname,
                    secondUserUsername: secondUser.username,
                    secondUserImage: secondUser.image,
                    secondUserId,
                    chatCreatorId,
                    registerDate: new Date()
                })
                await chat.save()

                return res.status(201).json({chat})
            }
            return res.status(200).json({
                    chat: candidateChat
                }
            )
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
    async findUserChats(req,res){
        try{
            const chats = await ChatRoutes.find( { $or: [ { secondUserId: req.user.userId }, { chatCreatorId: req.user.userId }, ] } )
            const normalizeChats = []
            for (let i = 0; i < chats.length; i++) {
                normalizeChats.push({
                    chatCreatorName:chats[i].chatCreatorName,
                    chatCreatorSurname:chats[i].chatCreatorSurname,
                    chatCreatorUsername:chats[i].chatCreatorUsername,
                    chatCreatorImage:chats[i].chatCreatorImage,
                    secondUserName: chats[i].secondUserName,
                    secondUserSurname: chats[i].secondUserSurname,
                    secondUserUsername: chats[i].secondUserUsername,
                    secondUserImage: chats[i].secondUserImage,
                    id: chats[i]._id,
                    secondUserId: chats[i].secondUserId,
                    chatCreatorId: chats[i].chatCreatorId,
                    registerDate: chats[i].registerDate
                })
            }
            return res.status(200).json({
                chats: normalizeChats
            })
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new ChatController()