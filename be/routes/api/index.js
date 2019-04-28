var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/hello', function(req, res, next) {
  res.send({
    msg: 'hello'
    , a: 1
  });
});

router.use('/test', require('./test'));
router.use('/user', require('./user'));

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});

module.exports = router;
