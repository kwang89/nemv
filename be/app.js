var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/api', require('./routes/api'))
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

const userSchema = new mongoose.Schema({
  name : {type: String, default: ''},
  age: {type: Number, default: 1}
});

const user = mongoose.model('user', userSchema);

mongoose.connect('mongodb://localhost:27017/nemv', { useNewUrlParser: true }, (err) => {
   if (err) return console.error(err)
   console.log('mongoose connected!')

   // user.create({ name: '하하'})
   // .then( r => console.log(r))
   // .catch( e => console.error(e))

   user.find()
   .then( r => console.log(r))
   .catch( e => console.error(e))

   // user.updateOne({ _id: '5cc5c56c853acf946814617c'}, { $set: { age: 34 }} )
   // .then( r => {
   //   console.log(r)
   //   console.log('updated')
   //   return user.find()
   // })
   // .then( r => console.log(r))
   // .catch( e => console.error(e))
   //
   // user.deleteOne({ name: '하하' })
   // .then( r => {
   //   console.log(r)
   //   console.log('updated')
   //   return user.find()
   // })
   // .then( r => console.log(r))
   // .catch( e => console.error(e))
});
