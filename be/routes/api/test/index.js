var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers);
  res.send({
    msg: 'hello',
    a: '괜찮아'
  });
});

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});

module.exports = router;
