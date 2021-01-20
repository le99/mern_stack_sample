var express = require('express');
var router = express.Router();
var _ = require('underscore');

let todos = [
  {id: 10, text: "laundry"},
  {id: 12, text: "cook"},
  {id: 13, text: "sweep"},
];

router.get('/', function(req, res) {
  res.json(todos);
});

router.post('/', function(req, res) {
  const newId = _.max(todos, (e) => {return e.id}).id + 1;
  todos.push({id: newId, text: req.body.text});
  return res.json(todos[todos.length - 1]); 
});

router.get('/:id', function(req, res) {
  const elem = _.find(todos, (e) =>{
    return e.id == req.params.id
  });
  if(!elem){
    return res.status(404).json({msg: "Not found"});
  }
  res.json(elem);
});

router.put('/:id', function(req, res) {

  console.log(req.body);
  todos = _.map(todos, e => {
    if(e.id == req.params.id){
      return {...e, text: req.body.text}
    }
    return e;
  })
  const elem = _.find(todos, (e) =>{
    return e.id == req.params.id
  });
  if(!elem){
    return res.status(404).json({msg: "Not found"});
  }
  res.json(elem);
});

router.use('/*', function(req, res){
  res.status(404).json({msg: 'Resource not found'});
});

module.exports = router;
