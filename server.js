
var express = require('express');
var path = require('path');
var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var db = require('./model/db');
var session      = require('express-session');
var app = express();



var blogModel = require('./model/blog');
var blogRoutes = require('./routes/blog');
var commentRoutes = require('./routes/commentRoutes');

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.static('public'));
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/userRoutes.js')(app, passport); 
app.use('/api/blog', blogRoutes);
app.get('/', function(req, res){
    res.readFile('index.html')
});

app.get('/', function(req, res){
	res.sendFile('blog.html');
});
var port = process.env.PORT || 8080;
app.listen(port); 