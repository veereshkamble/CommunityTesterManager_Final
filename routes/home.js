var mongoURL = "mongodb://localhost:27017/tester_db";
var mongo = require("./mongo");

//user signup
function signup(req,res) {
	res.render("signup");
}

//render login page
function login(req,res) {
	res.render("login");
}

//render landing page
function index(req,res) {
	res.render("index");
}

//render user dashboard
function userDashboard(req,res) {
	res.render("userDashboard",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}

//render admin dashboard
function adminDashboard(req,res) {
	res.render("adminDashboard",{firstname:req.session.adminfirstname, lastname:req.session.adminlastname});
}

//logging out of system
function logout(req,res) {
	req.session.destroy();
	res.render("index");
}

//signup API
function addUser(req, res){
	var json_responses={};
	console.log("Inside home addUser");
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var password = req.param("password");
	var cpswd = req.param("cpswd");
	var email = req.param("email");
	var phone = req.param("phone");
	var address = req.param("address");
	var state = req.param("state");
	var country = req.param("country");
	var city = req.param("city");
	var gender = req.param("gender");
	var role = req.param("role");

console.log("firstname: "+firstname);
console.log("gender: "+gender);
console.log("Role: " + role);
mongo.connect(mongoURL, function() {
	console.log('connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('userDetails');

	coll.insert({firstname : firstname, lastname : lastname, password : password, cpswd : cpswd, email : email, phone : phone, address : address, state : state, country : country, city : city, gender : gender, role : role}, function(err,user){
		if (user) {
			console.log("values successfully inserted");
			json_responses.statusCode= 200;
			res.send(json_responses);
		}
	});
});
}

//Login API
function userLogin(req,res){
	var json_responses={};
	console.log("In home login");
	console.log("email: "+req.param("email"));
	console.log("pwd: "+req.param("password"));

	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('userDetails');
		console.log("Fetching data from db");
		coll.findOne({email: req.param("email"),password: req.param("password")}, function(err, user){
			if(user) {
				var currentdate = new Date();
				console.log("currentHour is : "+currentdate.getHours());
				if(user.role == "tester")
					{
				req.session.useremail = user.email;
				req.session.userfirstname = user.firstname;
				req.session.userlastname = user.lastname;
					}
				else if(user.role == "testerManager")
					{
					req.session.adminemail = user.email;
					req.session.adminfirstname = user.firstname;
					req.session.adminlastname = user.lastname;
					}
				console.log("session email set to : "+req.session.useremail);
				console.log("session firstname set to : "+req.session.userfirstname);
				console.log("From login in mongo: "	+ JSON.stringify(user));
				json_responses.statusCode= 200;
				json_responses.data= user;
				console.log("Returning value(home.js): " + JSON.stringify(json_responses));
				res.send(json_responses);
			} else {
				json_responses.statusCode= 404;
				console.log("Returning errorv(home.js): " + JSON.stringify(json_responses));
				res.send(json_responses);
			}
		});
	});
};

// New code
function getUserProfile(req,res) {
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo for getUserProfile at: ' + mongoURL);
		var coll = mongo.collection('userDetails');
		console.log('*** ', req.session.useremail);

		coll.findOne({email: req.session.useremail}, function (err, userProfile) {
			if(userProfile) {
				res.render("updateProfile", {firstname: userProfile.firstname, lastname: userProfile.lastname, phone: userProfile.phone, address: userProfile.address, state: userProfile.state, country: userProfile.country, city: userProfile.city, buttonname:"Update Profile"});
			}
			else {
				res.render("updateProfile", {firstname:'', lastname:'', phone:'', address:'', state:'', country:'', city:'', buttonname:"Create Profile"});
			}
			console.log('**USer**',userProfile);
		});

	});
}

function afterProfileRegister(req,res) {
	var useremail = req.session.useremail;
	console.log('**session***',useremail);

	mongo.connect(mongoURL, function () {
			console.log('Connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('userDetails');
			coll.update(
				{email: req.session.useremail},
				{$set:{firstname:req.param("firstname"), lastname:req.param("lastname"), phone:req.param("phone"), address:req.param("address"), state:req.param("state"), country:req.param("country"), city:req.param("city")}}, function (err, userprofile) {
					if (userprofile)
					{
						console.log("Profile Updated");
								res.render("userDashboard");
					}
});
});
}

function viewUserProfile(req,res) {
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo for viewUserProfile at: ' + mongoURL);
		var coll = mongo.collection('userDetails');
		console.log('**viewUserProfile* ', req.session.useremail);

		coll.findOne({email: req.session.useremail}, function (err, userProfile) {
			if(userProfile) {
				res.render("viewProfile", {firstname: userProfile.firstname, lastname: userProfile.lastname, phone: userProfile.phone, address: userProfile.address, state: userProfile.state, country: userProfile.country, city: userProfile.city, buttonname:"Update Profile"});
			}
			else {
				res.render("viewProfile", {firstname:'', lastname:'', phone:'', address:'', state:'', country:'', city:'', buttonname:"Create Profile"});
			}
			console.log('**USer**',userProfile);
		});

	});
}

function deleteProfile(req,res) {
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo for deleteProfile at: ' + mongoURL);
		var coll = mongo.collection('userDetails');
		console.log('*deleteProfile**', req.session.useremail);
		var deleteQuery = { email: req.session.useremail};
		coll.remove(deleteQuery);
		res.render("index");
	});
}

function viewAssignedProjects(req,res) {
	console.log("inside viewAssignedProjects.home.js");
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('manageList');
		console.log("firstname session:", req.session.userfirstname);
		var tester = req.session.userfirstname;
		console.log("***Tester session***", tester);
		coll.find({testerName: {$eq:tester}}).toArray(function(err, projects) {
			if (projects) {
				console.log("The data retrieved is: "+ JSON.stringify(projects));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;
				json_responses.allProjectList= projects;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);

			}
		});
	});
}

exports.logout = logout;
exports.adminDashboard = adminDashboard;
exports.userDashboard = userDashboard;
exports.userLogin = userLogin;
exports.signup= signup;
exports.login= login;
exports.index= index;
exports.addUser = addUser;
exports.getUserProfile = getUserProfile;
exports.afterProfileRegister = afterProfileRegister;
exports.viewUserProfile = viewUserProfile;
exports.deleteProfile = deleteProfile;
exports.viewAssignedProjects = viewAssignedProjects;
