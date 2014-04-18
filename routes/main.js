var db = require('../models');
module.exports = function (app, passport) {

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
  res.render('login',{title:'login'});
  res.sendfile('./html/auth.html');
 });

app.get('/auth/facebook', passport.authenticate('facebook'));
 
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get("/logout", function(req, res){
  req.logout();
  res.redirect('/');
});



 };
