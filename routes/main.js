module.exports = function (app) {

 app.get('/', function(req, res){
  res.render('home', {title: 'Home'})
 });

 app.get('/draw', function(req, res){
  res.render('draw',{title:'Draw'})
 });
  
}