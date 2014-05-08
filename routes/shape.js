var db = require('../models')
var id = 1;

exports.create = function(req, res) {
  db.User.find({ where: { id: req.user.id } }).success(function(user) {
    db.Shape.create({ id: id, info: req.param('info') }).success(function(shape) {
      shape.setUser(user);
      id++;
    })
  })
}

exports.retrieve = function(req, res) {
  console.log("starting retrieve");
  db.User.find({ where: { id: req.user.id } }).success(function(user) {
    console.log("found user");
    console.log(user);
    db.Shape.findAll().success(function(shape){
      res.shapes = shape
      for(i =0; i< shape.length; i++){
        console.log(shape[i].dataValues.id)
      }
    });
  })
}
