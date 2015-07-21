var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');


var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.listen(app.get('port'), function() {
	console.log('Our app is running on http://localhost:' + app.get('port'));
});