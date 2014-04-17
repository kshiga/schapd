var db = require('../models');

module.exports = function (app) {

 app.get('/', function(req, res){
  res.render('home', {title: 'Home'})
 });

 app.get('/draw', function(req, res){
  res.render('draw',{title:'Draw'})
 });
  
 app.get('/about', function(req, res){
  res.render('about',{title:'About'})
 });

 app.get('/feedback', function(req, res){
  res.render('feedback',{title:'Feedback'})
 });

 app.get('/privacy', function(req, res){
  res.render('privacy',{title:'Privacy Policy'})
 });

 app.get('/login', function(req, res){
  res.render('login',{title:'login'})
  

 });

  app.post('/users/create', function(req, res) {
  db.User.create({ username: req.param('username') }).success(function() {
    res.redirect('/')
  })
});


};
