var pfp = angular
		.module('pfp', [ 'ngRoute' ])
		.config(
				[
						'$compileProvider',
						function($compileProvider) {
							$compileProvider
									.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/);
							// Angular before v1.2 uses
							// $compileProvider.urlSanitizationWhitelist(...)
						} ]);

pfp.run([ '$http', '$templateCache', function($http, $templateCache) {
	$http.get('login.html', {
		cache : $templateCache
	});
	$http.get('FDOHome.html', {
		cache : $templateCache
	});
	$http.get('FDRHome.html', {
		cache : $templateCache
	});
	$http.get('missionManager.html', {
		cache : $templateCache
	});
	$http.get('geoSpatial.html', {
		cache : $templateCache
	});
	$http.get('imManager.html', {
		cache : $templateCache
	});
	$http.get('ddo.html', {
		cache : $templateCache
	});
} ]);

pfp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl : 'login.html',
		controller : 'Login',
		resolve : {
			users : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/users/getAll'
				});
			} ]
		}
	}).when('/fdoHome', {
		templateUrl : 'FDOHome.html',
		controller : 'FDOHome',
		resolve : {
			requests : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/template/getAll'
				});
			} ]
		}
	}).when('/fdrHome', {
		templateUrl : 'FDRHome.html',
		controller : 'FDRHome',
		resolve : {
			requests : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/template/getAll'
				});
			} ]
		}
	}).when('/editRequest/:id', {
		templateUrl : 'editRequest.html',
		controller : 'EditRequest'
	}).when('/missionManager', {
		templateUrl : 'missionManager.html',
		controller : 'MissionManager',
		resolve : {
			templates : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/template/getAll'
				});
			} ]
		}
	}).when('/geoSpatial', {
		templateUrl : 'geoSpatial.html',
		controller : 'GeoSpatial',
		resolve : {
			templates : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/template/getAll'
				});
			} ]
		}
	}).when('/imManager', {
		templateUrl : 'imManager.html',
		controller : 'IMManager',
		resolve : {
			templates : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/template/getAll'
				});
			} ]
		}
	}).when('/ddo', {
		templateUrl : 'ddo.html',
		controller : 'DDO',
		resolve : {
			templates : [ '$http', function($http) {
				return $http({
					method : 'GET',
					url : 'rest/template/getAll'
				});
			} ]
		}
	}).otherwise({
		redirectTo : '/login'
	});
} ]);