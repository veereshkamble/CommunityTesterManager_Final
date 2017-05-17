var update = angular.module('update', ["ngRoute"]);

update.config([ '$routeProvider', function($routeProvider) {
	console.log("trying to route");
	$routeProvider.when('/viewAssignedProjects', {
		controller : 'viewAssignedProjectsCtrl',
		templateUrl : 'templates/viewAssignedProjects.ejs'
	})
} ]);


update.controller('updateProfileCtrl', function($scope, $http, $document) {

	$scope.updateProfile = function() {
			window.location.assign("/getUserProfile");
	};

	$scope.viewProfile = function() {
			window.location.assign("/viewUserProfile");
	};

	$scope.deleteProfile = function() {
	window.location.assign("/deleteProfile");
}

	$scope.viewBugReport = function(){
		window.location.assign("/viewBugReport");
	}


	$scope.bugReport = function() {
		// window.location.assign("/bugReport");
		console.log("Bug Name is: "+$scope.bugName);
		console.log("Description: "+$scope.description);
		// console.log("active / inactive status: "+$scope.activate);

		$http({
				method : "POST",
				url : "/bugReport",
				data : {
				"bugName" : $scope.bugName,
				"description" : $scope.description,
				"projectName" : $scope.projectName,
				"testerName" : $scope.testerName
						}
				}).success(function (res) {
					if(res.statusCode == 200) {
						console.log("successfully added");
    					window.location.assign("/userDashboard");
					}

				}).error(function (res){
					console.log("error while repoting a bug");
				});
		}
	});

	update.controller("viewAssignedProjectsCtrl", function($scope, $http, $routeParams) {
		console.log("inside viewAssignedProjects controller");

		  $scope.projectList = {};
			$scope.getProjectList = function() {
				$http({
					method : 'POST',
					url : '/viewAssignedProjects',
					data: {}
				}).success(function(data) {
					if(data){
						console.log("users list is: "+JSON.stringify(data));
						$scope.projectList = data.allProjectList;
						console.log("Projects list is: "+JSON.stringify($scope.projectList));
					}
				}).error(function (data){
					console.log("error while getting Projects");
				});
			};
	});
