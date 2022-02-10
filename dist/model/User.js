const { Schema, model } = require('mongoose');
const schema = new Schema({
    userName: { type: String, required: true, unique: false, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
module.exports = model('User', schema);
//# sourceMappingURL=User.js.map