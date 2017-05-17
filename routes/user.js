
/*
 * GET users listing.
 */
var mongoURL = "mongodb://localhost:27017/tester_db";
var mongo = require("./mongo");

exports.list = function(req, res){
  res.send("respond with a resource");
};


//User list API
function getUserlist(req, res){
	  console.log("inside userlist.js");
	  var json_responses={};
		mongo.connect(mongoURL, function() {
			console.log('connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('userDetails');
			coll.find({role: {$eq:"tester"}}).toArray(function(err, user) {
				if (user) {
					console.log("The data retrieved is: "+ JSON.stringify(user));
					console.log("Success retrieving the data!!");
					json_responses.statusCode= 200;
					json_responses.allUserlist= user;
					res.send(json_responses);
				} else {
					console.log("Error while fetching the data");
					json_responses.statusCode= 401;
					res.send(json_responses);

				}
			});
		});
	};

  function getManagelist(req, res){
  	  console.log("inside userlist.js");
  	  var json_responses={};
  		mongo.connect(mongoURL, function() {
  			console.log('connected to mongo at: ' + mongoURL);
  			var coll = mongo.collection('manageList');
  			coll.find().toArray(function(err, manage) {
  				if (manage) {
  					console.log("The data retrieved is: "+ JSON.stringify(manage));
  					console.log("Success retrieving the data!!");
  					json_responses.statusCode= 200;
  					json_responses.allManagelist= manage;
  					res.send(json_responses);
  				} else {
  					console.log("Error while fetching the data");
  					json_responses.statusCode= 401;
  					res.send(json_responses);

  				}
  			});
  		});
  	};

  function getProjectlist(req, res){
  	  console.log("inside projectlist.js");
  	  var json_responses={};
  		mongo.connect(mongoURL, function() {
  			console.log('connected to mongo at: ' + mongoURL);
  			var coll = mongo.collection('projectList');
  			coll.find().toArray(function(err, project) {
  				if (project) {
            // console.log('In routs/user.js -> ' + allProjectlist);
  					console.log("The data retrieved is: "+ JSON.stringify(project));
  					console.log("Success retrieving the projects!!");
  					json_responses.statusCode= 200;
  					json_responses.allProjectlist= project;
  					res.send(json_responses);
            console.log('In routes/user.js -> ' + project);
  				} else {
  					console.log("Error while fetching the projects");
  					json_responses.statusCode= 401;
  					res.send(json_responses);

  				}
  			});
  		});
  	};

    function viewBugReport(req, res) {
      res.render('bugReport');
    }

    function bugReport(req, res){
    	var json_responses = {};
    	console.log("Inside sensor.js bugReport");
    	var bugName = req.param("bugName");
    	var description = req.param("description");
    	var projectName = req.param("projectName");
    	var testerName = req.param("testerName");

    	mongo.connect(mongoURL, function() {
    		console.log('connected to mongo at: ' + mongoURL);
    		var coll = mongo.collection('bugList');
    		// Add project list starts here
    		coll.insert({bugName : bugName, description : description, projectName : projectName, testerName : testerName}, function(err,bug){
    			if (bug) {
    				console.log("Bug list successfully inserted");
    				json_responses.statusCode= 200;
    				res.send(json_responses);
    			}
    		});
    	})
    }

exports.getUserlist = getUserlist;
exports.getProjectlist = getProjectlist;
exports.getManagelist = getManagelist;
exports.bugReport = bugReport;
exports.viewBugReport = viewBugReport;
