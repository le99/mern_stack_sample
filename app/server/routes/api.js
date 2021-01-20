var express = require('express');
var router = express.Router();
var _ = require('underscore');

const todos = [
  {id: 10, text: "laundry"},
  {id: 12, text: "cook"},
  {id: 13, text: "sweep"},
];

router.get('/', function(req, res) {
  res.json(todos);
});

router.get('/:id', function(req, res) {
  res.json(_.find(todos, (e) =>{
    return e.id == req.params.id
  }));
});

router.use('/*', function(req, res){
  res.status(404).json({msg: 'Resource not found'});
});

module.exports = router;
