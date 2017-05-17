var mongoURL = "mongodb://localhost:27017/tester_db";
var mongo = require("./mongo");

//Add new sensor API
function addNewProject(req, res){
	var json_responses = {};
	console.log("Inside sensor.js addProject");
	var projectName = req.param("projectName");
	var description = req.param("description");
	var testingType = req.param("testingType");
	var platform = req.param("platform");

	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('projectList');
		// Add project list starts here
		coll.insert({projectName : projectName, description : description, testingType : testingType, platform : platform}, function(err,project){
			if (project) {
				console.log("Project list successfully inserted");
				json_responses.statusCode= 200;
				res.send(json_responses);
			}
		});
	})
}

// Manage Testers
function manageTesterProjects(req, res){
	var json_responses = {};
	console.log("Inside sensor.js Manage Testers");
	var projectName = req.param("projectName");
	var testerName = req.param("testerName");
	var velocity = req.param("velocity");

	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('manageList');
		// Add project list starts here
		coll.insert({projectName : projectName, testerName : testerName, velocity : velocity}, function(err,manage){
			if (manage) {
				console.log("Project list successfully inserted");
				json_responses.statusCode= 200;
				res.send(json_responses);
			}
		});
	})
}

exports.addNewProject = addNewProject;
exports.manageTesterProjects = manageTesterProjects;
