const mongoose = require('mongoose');
const cfg = require('../../config');

const siteSchema = new mongoose.Schema({
  title: { type: String, default: '등록필요'},
  copyright: { type: String, default: '등록필요'},
  dark: { type: Boolean, default: false }
});

module.exports = mongoose.model('Site', siteSchema);
