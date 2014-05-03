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
  db.User.find({ where: { id: req.param('user') } }).success(function(user) {
    db.Shape.find({where:{id: req.param('id')}}).success(function(shape){
      console.log(shape);
    });
  })
}
