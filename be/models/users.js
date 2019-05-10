const mongoose = require('mongoose');
const cfg = require('../../config');
mongoose.set('useCreateIndex', true);

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

user.findOne({ id: cfg.admin.id })
  .then((r) => {
    if (!r) return user.create({ id: cfg.admin.id, pwd: cfg.admin.pwd, name: cfg.admin.name })
    // if (r.lv === undefinded) return user.updateOne({ id: r._id}, {$set: {lv: 0, inCnt: 0}})
    return Promise.resolve(null)
  })
  .then((r) => {
    if (r) console.log(`admin:${r.id} created!`)
  })
  .catch((e) => {
    console.error(e.message)
  });

user.findOne({ id: 'lv2' })
    .then((r) => {
      if (!r) return user.create({ id: 'lv2', pwd: '1234', name: 'lv2', lv: 2 })
      return Promise.resolve(null)
    })
    .then((r) => {
      if (r) console.log(`admin:${r.id} created!`)
    })
    .catch((e) => {
      console.error(e.message)
    });

module.exports = user;
