//==============================================================================

var express, fs, bodyParser, request, logger, _, path, server, app;

express = require('express');
fs = require('fs');
bodyParser = require('body-parser');
path = require('path');
request = require('request');
logger = require('morgan');
_ = require('lodash');
app = express();
app.use(express.static('public'));

//==============================================================================

var favicon = require('serve-favicon');
var passport = require('passport');
var logger = require('express-logger');
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var session = require('express-session')
var errorhandler = require('errorhandler')
var LocalStrategy = require('passport-local').Strategy;

//==============================================================================

//https://github.com/Anomen/AuthenticationAngularJS/blob/master/app.js

 app.engine('html', require('ejs').renderFile);
 app.set('view engine', 'ejs');
 app.use(bodyParser.json());

// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log(username)
    console.log(password)
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};

//==============================================================================

// all environments
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(methodOverride())

app.use(session({
    genid: function(req) {
//        return genuuid() // use UUIDs for session IDs 
    },
    secret: 'securedsession',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
//app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler())
}

app.all('/*', function(req, res, next) {
  res.sendFile('index.html', { root: 'public/' });
});

//Set the localhost settings to:
app.set('port', process.env.PORT || 3000);
server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});