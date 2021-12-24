const {Schema, model} = require('mongoose')

const schema = new Schema({
    chatCreatorId: {
        type: String,
        required: true
    },
    chatCreatorName: {
        type: String,
        required: true
    },
    chatCreatorSurname: {
        type: String,
        required: true
    },
    chatCreatorUsername: {
        type: String,
        required: true
    },
    chatCreatorImage: {
        type: String,
    },
    secondUserName: {
        type: String,
        required: true
    },
    secondUserImage: {
        type: String,
    },
    secondUserSurname: {
        type: String,
        required: true
    },
    secondUserUsername: {
        type: String,
        required: true
    },
    secondUserId: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        required: true
    }
})

module.exports = model('Chat', schema)