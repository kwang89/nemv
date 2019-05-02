var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');


// 로그인 관련.. all들어가기전에 토큰없어도 실행됨.
router.use('/sign', require('./sign'));

// 미들웨어... all이면 get, post, put, delete 전부 받는다.
// * 으로 path를 받으므로 전부 여기를 거친후 아래 /user 같은 path 체크함.
router.all('*', function(req, res, next) {
  const token = req.headers.authorization;
  verifyToken(token)
    .then(v => {
      console.log(v);
      next();
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});


router.use('/user', require('./user'));
router.use('/test', require('./test'));
router.use('/sign', require('./sign'));

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});


const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
};

module.exports = router;
