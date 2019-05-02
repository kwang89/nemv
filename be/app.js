var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const history = require('connect-history-api-fallback');
const cors = require('cors');
const config = require('../config');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', require('./routes/api'))
app.use(history());
app.use(express.static(path.join(__dirname, '..', 'fe', 'dist')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    msg : err.message
  })
});

module.exports = app;

const mongoose = require('mongoose');
const user = require('./models/users');

mongoose.connect(config.dbUrl, { useNewUrlParser: true }, (err) => {
   if (err) return console.error(err);
   console.log('mongoose connected!');
});


// var jwt = require('jsonwebtoken');
// const key = 'key입니다.'
// var token = jwt.sign({ id: 'memi', email: 'memi@xxx.com' }, key);
// console.log(token);
//
//  var decoded = jwt.verify(token, key); //, (err, r) => {
//   if (err) return console.log(err);
// });
// console.log(decoded); // bar
// console.log(new Date(decoded.iat * 1000));

// const foo = (v, cb) => {
//   if (v>1) return cb(new Error('abcd'));
//   setTimeout(() => {
//     cb(false, v+1);
//   }, 3000);
// };
//
// foo(2, (err, r) => {
//   if (err) return console.error(err.message);
//   console.log('a :' +  r);
// });

// user.findOne({}, (err, r) => {
//   if (err) return console.error(err)
//   console.log(r)
// });
//
// user.findOne({})
// .then(r => console.log(r))
// .catch(err => console.error(err));

// user.findOne({ name: 'aaa'}, (err, u) => {
//   if (err) return console.error(err.message)
//   if (!u) {
//     console.log(u) // null
//     user.create({ name: 'aaa', age: 10 }, (err, cu) => {
//       if (err) return console.error(err.message)
//       console.log(cu) // { name: 'aaa', age: 10, _id: 5bd81974ad66cf3832db0838, __v: 0 }
//       jwt.sign({ name: cu.name, age: cu.age}, key, (err, token) => {
//         if (err) return console.error(err.message)
//         console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message)
//           console.log(v) // { name: 'aaa', age: 10, iat: 1540888948 }
//         })
//       })
//     })
//   }
//   else {
//     console.log(u) // { name: 'aaa', age: 10, _id: 5bd81974ad66cf3832db0838, __v: 0 }
//     const user = u
//     user.updateOne({ _id: u._id }, { $inc: { age: 1 }}, (err, ur) => {
//       if (err) return console.error(err.message)
//       console.log(ur) // { n: 1, nModified: 1, ... }
//       jwt.sign({ name: user.name, age: user.age + 1 }, key, (err, token) => {
//         if (err) return console.error(err.message)
//         console.log(token) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//         jwt.verify(token, key, (err, v) => {
//           if (err) return console.error(err.message)
//           console.log(v) // { name: 'aaa', age: 11, iat: 1540889007 }
//         })
//       })
//     })
//   }
// })

// const signToken = (u, k) => {
//   return new Promise((resolve, reject) => {
//     jwt.sign({ name: u.name, age: u.age }, k, (err, token) => {
//       if (err) reject(err)
//       resolve(token)
//     })
//   })
// }
// const verifyToken = (t, k) => {
//   return new Promise((resolve, reject) => {
//     jwt.verify(t, k, (err, v) => {
//       if (err) reject(err)
//       resolve(v)
//     })
//   })
// }

// let usr
// user.findOne({ name: 'aaa' })
//   .then((u) => {
//     if (!u) return user.create({ name: 'aaa', age: 10 })
//     return Promise.resolve(u)
//   })
//   .then((u) => {
//     usr = u
//     return user.updateOne({ _id: u._id }, { $inc: { age: 1 }})
//   })
//   .then((r) => {
//     if (!r.nModified) throw new Error('수정된 것이 없네요..')
//     usr.age++
//     return signToken(usr, key)
//   })
//   .then((token) => {
//     return verifyToken(token, key)
//   })
//   .then(v => console.log(v))
//   .catch((err) => {
//     console.error(err.message)
//   })

// const asyncTest = async (i) => {
//   if (i > 10) throw new Error('10보다 큰건 싫어요')
//   return i + 2
// }
//
// asyncTest(1)
//   .then(r => console.log(`2 더해져서 ${r} 입니다.`))
//   .catch(e => console.error(`에러났네요: ${e.message}`))
//
// asyncTest(11)
//   .then(r => console.log(`2 더해져서 ${r} 입니다.`))
//   .catch(e => console.error(`에러났네요: ${e.message}`))


// const getToken = async (name) => {
//   let u = await user.findOne({ name }) // name: name을 축약하고 await로 기다려 줍니다.
//   if (!u) u = await user.create({ name , age: 10 }) // 만들어주고 u를 갱신 합니다.
//   if (u.age > 12) throw new Error(`${u.age}는 나이가 너무 많습니다.`)
//   const ur = await user.updateOne({ _id: u._id }, { $inc: { age: 1 }}) // age를 증가시키고 ur(user result)에 결과값을 담아놓습니다.
//   if (!ur.nModified) throw new Error('수정된 것이 없네요..') // 수정된 값이 없다면 에러와 함께 내보냅니다.
//   u = await user.findOne({ _id: u._id }) // age가 증가 된 것으로 갱신해줍니다.
//   const token = await signToken(u, key) // 토큰을 만듭니다.
//   const v = await verifyToken(token, key)
//   return v
// }
//
// getToken('aaa')
//   .then(v => console.log(v))
//   .catch(err => console.error(err.message))
