const mongoose = require('mongoose');
const UserSchema = require('./user');
const MessageSchema = require('./Message');

const ChatSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    messages: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'message'
        }],
        required: true
    }
}, {
    timestamps: true //fecha y hora donde se crea el mensaje   
})

module.exports = mongoose.model('chat', ChatSchema)