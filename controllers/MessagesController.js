const Chat = require('../models/Chat')
const Message = require('../models/Message')
const User = require('../models/User')

class MessageController{
    async sendMessage(req,res) {
        try{
            const chat = await Chat.findById(req.params.chatId)
            if(!chat){
                return res.status(400).json({message: 'Chat not found'})
            }
            if(chat.secondUserId !== req.user.userId && chat.chatCreatorId !== req.user.userId || req.user.userId === req.query.toUser) {
                return res.status(400).json({message: "Вы не можете отправлять сообщения в этот чат"})
            }
            if(chat.secondUserId !== req.query.toUser && chat.chatCreatorId !== req.query.toUser) {
                return res.status(400).json({message: "Вы не можете отправлять сообщения в этот чат"})
            }
            const toUser = await User.findById(req.query.toUser)
            if(!toUser){
                return res.status(400).json({message: "User not found"})
            }
            const currentUser = await User.findById(req.user.userId)
            if(!currentUser){
                return res.status(400).json({message: "User not found"})
            }
            const message = new Message({
                chatId: chat._id,
                fromUsername: currentUser.username,
                fromName: currentUser.name,
                from: req.user.userId,
                toUsername: toUser.username,
                toName: toUser.name,
                to: toUser._id,
                message: req.body.message,
                checked: false,
                sendTime: new Date()
            })
            await message.save()
            return res.status(201).json({
                    message: {
                        id: message._id,
                        chatId: message.chatId,
                        fromUsername: message.fromUsername,
                        fromName: message.fromName,
                        from: message.from,
                        toUsername: message.toUsername,
                        toName: message.toName,
                        to: message.to,
                        message: message.message,
                        checked: message.checked,
                        sendTime: message.sendTime
                    }
                }
            )
        }
        catch (e) {
            return res.status(400).json({message:'Что-то пошло не так, попробуйте снова'})
        }
    }

    async getChatMessages(req,res){
        try{
            const chat = await Chat.findById(req.params.chatId)
            if(!chat){
                return res.status(400).json({error: 'Chat not found'})
            }
            if(chat.secondUserId !== req.user.userId && chat.chatCreatorId !== req.user.userId || req.user.userId === req.query.secondUserId) {
                return res.status(400).json({error: "Вы не можете получить доступ к этому чату"})
            }
            const secondUser = await User.findById(req.query.secondUserId)
            if(!secondUser) {
                return res.status(400).json({error: "User not found"})
            }
            const currentUser = await User.findById(req.user.userId)
            if(!currentUser) {
                return res.status(400).json({error: "User not found"})
            }
            const messages = await Message.find({chatId: chat._id})
            let normalizeMessages = []
            for (let i = 0; i < messages.length; i++) {
                normalizeMessages.push({
                    id: messages[i]._id,
                    chatId: messages[i].chatId,
                    fromUsername: messages[i].fromUsername,
                    fromName: messages[i].fromName,
                    from: messages[i].from,
                    toUsername: messages[i].toUsername,
                    toName: messages[i].toName,
                    to: messages[i].to,
                    message: messages[i].message,
                    checked: messages[i].checked,
                    sendTime: messages[i].sendTime
                })
            }
            return res.status(200).json({messages: normalizeMessages,
                secondUser: {
                    id: secondUser._id,
                    username: secondUser.username,
                    name: secondUser.name,
                    surname: secondUser.surname,
                    email: secondUser.email,
                    role: secondUser.role,
                    registerDate: secondUser.registerDate
                },
                chatId: chat._id
            })
        }
        catch (e) {
            return res.status(400).json({error:'Что-то пошло не так, попробуйте снова'})
        }
    }
}

module.exports = new MessageController()