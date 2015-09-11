var app = angular.module('myApp', [
	'ngRoute',
	'courseControllers'
]).config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/courses', {
			templateUrl : '/partials/course-list.html',
			controller : 'courseListCtrl'
		}).
		when('/course/:courseId', {
			templateUrl : '/partials/course-detail.html',
			controller : 'courseDetailCtrl'
		}).
		when('/overview', {
			controller : 'courseListCtrl'
		}).
		otherwise({
			redirectTo: '/overview'
		});
	}
]).config(function($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist(['**']);
});