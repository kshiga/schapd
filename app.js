
/**
 * Module dependencies.
 */

var express = require('express');
var user    = require('./routes/user');
var http = require('http');
var path = require('path');
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:3000/users'
var passport = require('passport');
var flash = require('connect-flash');
var db = require('./models');
var sequelize = require('sequelize');
var LocalStrategy = require('passport-local').Strategy;


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.session({ secret: 'nope' })); 

var FacebookStrategy = require('passport-facebook').Strategy;
 
var FACEBOOK_APP_ID = 521260001317076;
var FACEBOOK_APP_SECRET = 'd4ee4f232ba115d7b571871869107462';

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    db.User.findOrCreate({id: profile.id}, {firstname: profile.name.givenName}, {lastname: profile.name.familyName}, {picture: profile.profileURL}).success(function(){
      done(null, profile);
     });
  });
}));
 
passport.serializeUser(function(user, done) {
  done(null, user);
});
 
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(express.bodyParser())
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


require('./routes/main')(app, passport);

 


db
  .sequelize
  .sync({ force: true })
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })