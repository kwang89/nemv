var express = require('express');
var createError = require('http-errors');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    msg: 'test',
    a: 'test root'
  });
});

router.all('*', function(req, res, next) {
  next(createError(404, 'api 없음'));
});

module.exports = router;
