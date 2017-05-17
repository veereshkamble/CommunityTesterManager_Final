
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  ,home = require('./routes/home')
  ,manage= require('./routes/manage')
  , http = require('http')
  , path = require('path');

var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);  //passing parameter to expressSession module

var app = express();

//mongo session
app.use(expressSession({
	secret: 'CMPE281_session',
	resave: true,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);

//signup, login, frontpage and dashboard
app.get('/', routes.index);
app.get('/signup', home.signup);
app.get('/login', home.login);
app.get('/home', home.index);
app.get('/adminDashboard',home.adminDashboard);
app.get('/logout', home.logout);
app.post('/addUser',home.addUser);
app.post('/userLogin',home.userLogin);
app.get('/userDashboard',home.userDashboard);

//manage projects and testers
app.post('/addNewProject',manage.addNewProject);
app.post('/manageTesterProjects',manage.manageTesterProjects);

// Get all lists
app.post('/getUserlist',user.getUserlist);
app.post('/getProjectlist',user.getProjectlist);
app.post('/getManagelist',user.getManagelist);

//Bug Report
app.get('/viewBugReport', user.viewBugReport);
app.post('/bugReport', user.bugReport);
app.post('/viewAssignedProjects', home.viewAssignedProjects);

//*****update profile API ******
app.get('/getUserProfile', home.getUserProfile);
app.post('/afterProfileRegister', home.afterProfileRegister);
app.get('/viewUserProfile', home.viewUserProfile);
app.all('/deleteProfile', home.deleteProfile);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
