const mongoose = require('mongoose');

const { Schema } = mongoose;

const User = new Schema({
    userId: {
        type: Number,
        required: true
    },
    isAuthor: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

module.exports = mongoose.model('User', User);
