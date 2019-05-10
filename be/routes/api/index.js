var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰 입니다.'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
};

// 로그인 관련.. all들어가기전에 토큰없어도 실행됨.
router.use('/sign', require('./sign'));

// 미들웨어... all이면 get, post, put, delete 전부 받는다.
router.all('*', function(req, res, next) {
  const token = req.headers.authorization.toString();
  verifyToken(token)
    .then(v => {
      console.log(v);
      req.user = v;
      next();
    })
    .catch(e => {
      res.send({ success: false, msg: e.message });
    })
});

router.use('/page', require('./page'));
router.use('/manage', require('./manage'));

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});




module.exports = router;
