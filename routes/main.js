var db = require('../models');
module.exports = function (app, passport) {

 app.get('/', function(req, res){
  res.render('home', {title: 'Home', user: req.user, userid: req.user});
  app.locals.user1 = req.user;
 });

 app.get('/draw', function(req, res){
  res.render('draw', {title: 'Draw', user: req.user, userid: req.user});
  res.locals.user1 = req.user;
 });

  app.get('/drawtry', function(req, res){
  res.render('draw-try', {title: 'Draw'});
 });
  
 app.get('/about', function(req, res){
  res.render('about',{title:'About', user: req.user, userid: req.user});
  res.locals.user1 = req.user;
 });

 app.get('/feedback', function(req, res){
  res.render('feedback',{title:'Feedback', user: req.user, userid: req.user});
  res.locals.user1 = req.user;
 });

 app.get('/privacy', function(req, res){
  res.render('privacy',{title:'Privacy Policy', user: req.user, userid: req.user});
  res.locals.user1 = req.user;
 });

 app.get('/login', function(req, res){
  res.render('login',{title:'login', user: req.user, userid: req.user});
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
