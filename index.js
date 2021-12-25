const express = require('express');
const app = express()
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const PORT = config.get('port') || 4000

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    allowEIO3: true
});
//sockets
io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
        socket.join(room);
        const sendTime = new Date()
        io.to(room).emit('joinRoom', {
            username: 'Admin',
            message: `User joined ${room}`,
            sendTime: `${sendTime.getHours()}:${sendTime.getMinutes()}`,
            room: room
        })
    })
    socket.on('message', (data) => {
        io.to(data.room).emit('message', {
            id: data.id,
            chatId: data.chatId,
            fromUsername: data.fromUsername,
            fromName: data.fromName,
            from: data.from,
            toUsername: data.toUsername,
            toName: data.toName,
            to: data.to,
            message: data.message,
            checked: data.checked,
            sendTime: data.sendTime
        })
    })
    socket.on('leaveRoom', (room) => {
        socket.leave(room)
    })

    socket.on('disconnect', (socket) => {

    });
});
//routes
app.use(express.json())
app.use(cors())
app.use('/auth', require('./routes/auth.routes'))
app.use('/user', require('./routes/user.routes'))
app.use('/chat', require('./routes/chat.routes'))
app.use('/message', require('./routes/message.routes'))
app.use('/car', require('./routes/car.routes'))

//start server
function start(){
    try{
        mongoose.connect(config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            () => console.log('MongoDB connected')
        )
        server.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    }
    catch (e) {
        console.log(e);
    }
}
start()