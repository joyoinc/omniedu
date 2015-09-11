var courseControllers = angular.module('courseControllers', []);

courseControllers.controller('courseListCtrl', ['$scope', '$http', function($scope, $http) {
    var url = "http://xx-rest.herokuapp.com/_apis/oe/lesson/";
	$http.get(url + $scope.lessonId).success(function(response) { 
		$scope.courses = response;
    });
}]);

courseControllers.controller('courseDetailCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) { 
	var url = "http://xx-rest.herokuapp.com/_apis/oe/course/";
	$http.get(url + $routeParams["courseId"]).success(function(response) { 
		$scope.course = response;
		console.log($scope.course);
    });
}]);
