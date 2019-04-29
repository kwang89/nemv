const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {type: String, default: '', unique: true, index: true},
  age: {type: Number, default: 1}
});

const user = mongoose.model('user', userSchema);

module.exports = user;
