var express = require('express');
var createError = require('http-errors');
var router = express.Router();
const jwt = require('jsonwebtoken');
const cfg = require('../../../config');
const moment = require('moment');

const verifyToken = (t) => {
  return new Promise((resolve, reject) => {
    if (!t) resolve({ id: 'guest', name: '손님', lv: 3 })
    if ((typeof t) !== 'string') reject(new Error('문자가 아닌 토큰 입니다.'))
    if (t.length < 10) resolve({ id: 'guest', name: '손님', lv: 3 })
    jwt.verify(t, cfg.jwt.secretKey, (err, v) => {
      if (err) reject(err)
      resolve(v)
    })
  })
};

const signToken = (id, lv, name, rmb) => {
  return new Promise((resolve, reject) => {
    const o = {
      issuer: cfg.jwt.issuer,
      subject: cfg.jwt.subject,
      expiresIn: cfg.jwt.expiresIn, // 3분
      algorithm: cfg.jwt.algorithm
    }
    if(rmb) o.expiresIn = cfg.jwt.expiresInRemember // 7일
    jwt.sign({ id, lv, name }, cfg.jwt.secretKey, o, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
};

const getToken = async(t) => {
  let vt = await verifyToken(t);
  if (vt.lv > 2) return { user: vt, token: null }
  const diff = moment(vt.exp * 1000).diff(moment(), 'seconds')
  console.log(diff)
  if (diff > (vt.exp - vt.iat) / cfg.jwt.expiresInDiv) return { user: vt, token: null }

  const nt = await signToken(vt.id, vt.lv, vt.name, vt.rmb)
  vt = await verifyToken(nt)
  return { user: vt, token: nt}
};

// 로그인 관련.. all들어가기전에 토큰없어도 실행됨.
router.use('/sign', require('./sign'));
router.use('/site', require('./site'));
router.use('/register', require('./register'));

// 미들웨어... all이면 get, post, put, delete 전부 받는다.
router.all('*', function(req, res, next) {
  // 토큰검사
  const token = req.headers.authorization
  getToken(token)
    .then((v) => {
      console.log(v)
      req.user = v.user
      req.token = v.token
      next()
    })
    .catch(e => res.send({ success: false, msg: e.message }))
});

router.use('/page', require('./page'));
router.use('/manage', require('./manage'));

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});




module.exports = router;
