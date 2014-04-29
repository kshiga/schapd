var db = require('../models')

exports.create = function(req, res) {
  db.User.find({ where: { id: req.param('userid') } }).success(function(user) {
    console.log(user.id)
    db.Shape.create({ id:req.param('id'), info: req.param('info') }).success(function(id) {
      id.setUser(user);
    })
  })
}

exports.retrieve = function(req, res) {
  db.User.find({ where: { id: req.param('userid') } }).success(function(user) {
    db.Shape.findAll().success(function(shapes){
      console.log(shapes);
    });
  })
}
