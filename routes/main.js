var db = require('../models');
module.exports = function (app, passport) {

 app.get('/', function(req, res){
  res.render('home', {title: 'Home', user: req.user, shapes: req.user});
 });

 app.get('/draw', function(req, res){
  console.log("starting retrieve");
  db.User.find({ where: { id: req.user.id } }).success(function(user) {
    console.log("found user");
    console.log(user);
    db.Shape.findAll().success(function(shape){
      res.render('draw', {title: 'Draw', user: req.user, shapes: shape, s: shape});
      res.locals.shapes = shape
      for(i =0; i< shape.length; i++){
        console.log(shape[i].dataValues.id)
      }
    });
  })
 });

 app.get('/drawtry', function(req, res){
  res.render('draw-try', {title: 'Draw'});
 });
  
 app.get('/about', function(req, res){
  res.render('about',{title:'About', user: req.user});
 });

 app.get('/feedback', function(req, res){
  res.render('feedback',{title:'Feedback', user: req.user});
 });

 app.get('/privacy', function(req, res){
  res.render('privacy',{title:'Privacy Policy', user: req.user});
 });

 app.get('/login', function(req, res){
  res.render('login',{title:'login', user: req.user});
  res.sendfile('./html/auth.html');
 });

app.get('/auth/facebook', passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/draw',
  failureRedirect: '/login'
}));

app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/');
});




};
