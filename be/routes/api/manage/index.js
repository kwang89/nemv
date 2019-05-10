var express = require('express');
var createError = require('http-errors');
var router = express.Router();


router.all('*', function(req, res, next) {
  if (req.user.lv) return res.send({ success: false, msg: '권한이 없습니다.' })
  next()
})

router.use('/user', require('./user'));
router.use('/page', require('./page'));

module.exports = router;
