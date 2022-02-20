const { Schema, model } = require('mongoose');

const schema = new Schema({
    userName: { type: String, required: true, unique: false, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
        type: String,
        default: '',
    },
    newPassword: { type: String, required: false, default: '' },
});
module.exports = model('User', schema);
