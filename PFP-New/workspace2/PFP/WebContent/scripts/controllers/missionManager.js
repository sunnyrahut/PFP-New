pfp.controller('MissionManager', [
		'$scope',
		'$http',
		'$location',
		'templates',
		function($scope, $http, $location, templates) {
			var templateNew = new Array();
			for (i = 0; i < templates.data.data.length; i++) {
				if (templates.data.data[i].status == "initialized") {
					templateNew.push(templates.data.data[i])
				}
			}
			$scope.templates = templateNew;
			$scope.submitFile = function(id, country, rules, sensor, comments,
					status) {
				var obj = {
					"templateId" : id,
					"templateCountry" : country,
					"templateFile" : reader.result,
					"status" : "updated",
					"rules" : rules,
					"sensor" : sensor,
					"comments" : comments
				};
				$http({
					method : 'POST',
					url : 'rest/template/update',
					data : obj,
					responseType : 'json'
				}).success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
					alert("Template has been updated and sent to the FDR");
					$location.path('/missionManager/');
				}).error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
			};
			$scope.openSocket = function() {
				$http({
					method : 'POST',
					url : 'rest/template/socket',
					responseType : 'json'
				}).success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				}).error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
			}
			$scope.openRedact = function() {
				var str = $scope.path;
				var res = str.split("\\");
				var path = res.join("!");
				console.log(res);
				$http(
						{
							method : 'POST',
							url : 'rest/template/redact/' + path + '/'
									+ $scope.c + '/' + $scope.r + '/'
									+ $scope.s,
							responseType : 'json'
						}).success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				}).error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
			}
			$scope.openRedactEditor = function() {
				$http({
					method : 'POST',
					url : 'rest/template/redactEditor',
					responseType : 'json'
				}).success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				}).error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
			}
			$scope.logout = function() {
				$location.path('/login/');
			}
		} ]);