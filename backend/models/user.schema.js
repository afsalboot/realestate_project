const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true },
    avatar:{type: String, default: null },
    email:{type: String, required: true, unique: true },
    password:{type: String, required: true, unique: true },
},{timestamps: true})

module.exports = mongoose.model('User', userSchema);