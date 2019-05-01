var express = require('express');
var createError = require('http-errors');
var router = express.Router();


// 미들웨어... all이면 get, post, put, delete 전부 받는다.
// * 으로 path를 받으므로 전부 여기를 거친후 아래 /user 같은 path 체크함.
router.all('*', function(req, res, next) {
  //토큰 검사
  next();
});

router.use('/user', require('./user'));
router.use('/test', require('./test'));
router.use('/sign', require('./sign'));

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});

module.exports = router;
