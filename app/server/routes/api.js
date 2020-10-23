var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({data:'Some data'});
});

router.use('/*', function(req, res){
  res.status(404).json({msg: 'Resource not found'});
});

module.exports = router;
