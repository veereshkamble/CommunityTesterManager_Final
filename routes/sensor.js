var mongoURL = "mongodb://localhost:27017/tester_db";
var mongo = require("./mongo");

//Add new sensor API
function addNewSensor(req, res){
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

//List sensor API
function getSensorDetails(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log('connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.find({"deleted":0}).toArray(function(err, user) {

			if (user) {
				console.log("The data retrieved is: "+ JSON.stringify(user));
				console.log("Success retrieving the data!!");
				json_responses.statusCode= 200;
				json_responses.allSensorList= user;
				res.send(json_responses);
			} else {
				console.log("Error while fetching the data");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
}

//Delete sensor API
function deleteSensor(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.update({"sensorname":req.param("sensorname") , "location":req.param("location")} , { $set : {"deleted":1}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				res.statusCode = 200;
				res.send(json_responses);
			} else {
				res.statusCode = 401;
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

//deactivate sensor API
function deactivateSensor(req,res){
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.update({"sensorname":req.param("sensorname") , "location":req.param("location")} , { $set : {"activate":"inactive"}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				json_responses.statusCode = 200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

//activate sensor API
function activateSensor(req,res){
	var json_responses = {};
	mongo.connect(mongoURL, function() {
		console.log("sensor name is : "+req.param("sensorname"));
		console.log("sensor location is : "+req.param("location"));
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorMetadata');
		coll.update({"sensorname":req.param("sensorname") , "location":req.param("location")} , { $set : {"activate":"active"}},function(err, user) {
			if (user) {
				console.log("Success in deleting the sensor");
				json_responses.statusCode = 200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;
				console.log("couldn't delete the sensor.. Sorry");
				res.send(json_responses);
			}
		});
	});
}

exports.activateSensor = activateSensor;
exports.deactivateSensor = deactivateSensor;
exports.deleteSensor = deleteSensor;
exports.getSensorDetails = getSensorDetails;
exports.addNewSensor = addNewSensor;
exports.manageTesterProjects = manageTesterProjects;
