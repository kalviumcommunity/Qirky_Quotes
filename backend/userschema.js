const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String
});

const userInfo = mongoose.model("userinfos", userSchema); 

module.exports = { userInfo };