var app = angular.module('app', ["ngRoute"]);



app.config([ '$routeProvider', function($routeProvider) {
	console.log("trying to route");
	$routeProvider.when('/addProject', {
		controller : 'addProjectCtrl',
		templateUrl : 'templates/addProject.ejs'
	}).when('/manageTester', {
		controller : 'manageTesterCtrl',
		templateUrl : 'templates/manageTester.ejs'
	}).when('/userlist', {
		controller : 'userlistCtrl',
		templateUrl : 'templates/userList.ejs'
	}).when('/projectlist', {
		controller : 'projectlistCtrl',
		templateUrl : 'templates/projectlist.ejs'
	}).when('/managelist', {
		controller : 'managelistCtrl',
		templateUrl : 'templates/managelist.ejs'
	})
} ]);

app.controller("addProjectCtrl", function($scope, $http)
{
	console.log("Inside Add sensor Controller");

	$scope.addProject= function(){
	console.log("Project Name is: "+$scope.projectName);
	console.log("describe the sensor: "+$scope.description);
	// console.log("active / inactive status: "+$scope.activate);

	$http({
    	method : "POST",
    	url : "/addNewProject",
    	data : {
			"projectName" : $scope.projectName,
			"description" : $scope.description,
			"testingType" : $scope.testingType,
			"platform" : $scope.platform
    			}
    	}).success(function (res) {
				if(res.statusCode == 200) {
					console.log("successfully added");
						window.location.assign("/adminDashboard");
				}
    	}).error(function (res){
    		console.log("error while adding a new project");
    	});
	}

});

app.controller("manageTesterCtrl", function($scope, $http)
{
	console.log("Inside Manage Tester Controller");

	$scope.manageTester= function(){
	console.log("Project Name is: "+$scope.projectName);
	console.log("Tester Name: "+$scope.testerName);
	// console.log("active / inactive status: "+$scope.activate);

	$http({
    	method : "POST",
    	url : "/manageTesterProjects",
    	data : {
			"projectName" : $scope.projectName,
			"testerName" : $scope.testerName,
			"velocity" : $scope.velocity
    			}
    	}).success(function (res){
				if(res.statusCode == 200) {
					console.log("successfully added");
						window.location.assign("/adminDashboard");
				}
    	}).error(function (res) {
    		console.log("error while managing");
    	});
	}

});

app.controller("userlistCtrl", function($scope, $http, $routeParams) {
	console.log("inside userlist controller");

	  $scope.userlist = {};
		$scope.getUserlist = function() {
			$http({
				method : 'POST',
				url : '/getUserlist',
				data: {}
			}).success(function(data) {
				if(data){
					console.log("users list is: "+JSON.stringify(data));
					$scope.userlist = data.allUserlist;
					console.log("Success in retrieving the sensor metadata");
					console.log("users list is: "+JSON.stringify($scope.userlist));
				}
			}).error(function (data){
				console.log("error while adding a sensor");
			});
		};
});

app.controller("managelistCtrl", function($scope, $http, $routeParams) {
	console.log("inside Manage list controller");

	  $scope.managelist = {};
		$scope.getManagelist = function() {
			$http({
				method : 'POST',
				url : '/getManagelist',
				data: {}
			}).success(function(data) {
				if(data){
					console.log("Manage list is: "+JSON.stringify(data));
					$scope.managelist = data.allManagelist;
					console.log("Success in retrieving the assigned data");
					console.log("Assigned list is: "+JSON.stringify($scope.managelist));
				}
			}).error(function (data){
				console.log("error while managing a tester");
			});
		};
});

app.controller("projectlistCtrl", function($scope, $http, $routeParams) {
	console.log("inside projectlist controller");

	  $scope.projectlist = {};
		$scope.getProjectlist = function() {
			$http({
				method : 'POST',
				url : '/getProjectlist',
				data: {}
			}).success(function(data) {
				if(data){
					console.log("Project list is: "+JSON.stringify(data));
					$scope.projectlist = data.allProjectlist;
					console.log('All project list func.->' + data.allProjectlist);
					console.log("Success in retrieving the Project List");
					console.log("Project list is: "+JSON.stringify($scope.projectlist));
					// $("#success-alert2").show();
	        //     $("#success-alert2").fadeTo(2000, 1000).slideUp(1000, function(){
	        //     // window.location.assign("/login");
	        //     });
				}
			}).error(function (data){
				console.log("error while adding a project");
			});
		};
});
