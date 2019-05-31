const mongoose = require('mongoose');
const cfg = require('../../config');
mongoose.set('useCreateIndex', true);
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  age: { type: Number, default: 1 },
  id: { type: String, default: '', uniqWue: true, index: true },
  pwd: { type: String, default: '' },
  lv: { type: Number, default: 2 }, //add
  inCnt: { type: Number, default: 0 }, //add
  retry: { type: Number, default: 0 }
});

const user = mongoose.model('user', userSchema);
//user.collection.dropIndexes({ name: 1 });
//user.deleteMany({}).then(r => console.log(r))
user.findOne({ id: cfg.admin.id })
  .then((r) => {
    if (!r) return user.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name, lv: 0 })
    // if (r.lv === undefinded) return user.updateOne({ id: r._id}, {$set: {lv: 0, inCnt: 0}})
    return Promise.resolve(r)
  })
  .then((r) => {
    if (r.pwd !== cfg.admin.pwd) return Promise.resolve(null)
    if (r) console.log(`admin:${r.id} created!`)
    const pwd = crypto.scryptSync(r.pwd, r._id.toString(), 64, { N: 1024 }).toString('hex')
    return user.updateOne({ _id: r._id}, { $set: { pwd } })
  })
  .then((r) => {
    if (r) console.log(`password changed`)
  })
  .catch((e) => {
    console.error(e.message)
  });

module.exports = user;
