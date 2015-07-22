pfp.controller('EditRequest', [ '$scope', '$http', '$location', '$routeParams',
		function($scope, $http, $location, $routeParams) {
			var template;
			$http({
				method : 'GET',
				url : 'rest/template/get/' + $routeParams.id,
				responseType : 'json'
			}).success(function(data, status, headers, config) {
				console.log(data, status, headers, config);
				template = data.data;
				$scope.id = template.templateId;
				$scope.country = template.templateCountry;
				$scope.rules = template.rules;
				$scope.sensor = template.sensor;
				$scope.comments = template.comments;
				$scope.status = template.status;

			}).error(function(data, status, headers, config) {
				console.log(data, status, headers, config);
			});
			$scope.updateRequest = function() {
				var obj = {
					"templateId" : $scope.id,
					"templateCountry" : $scope.country,
					"templateFile" : template.templateFile,
					"status" : $scope.status,
					"rules" : $scope.rules,
					"sensor" : $scope.sensor,
					"comments" : $scope.comments
				};
				$http({
					method : 'POST',
					url : 'rest/template/update',
					data : obj,
					responseType : 'json'
				}).success(function(data, status, headers, config) {
					console.log(data, status, headers, config);
					$location.path('/fdoHome/');
				}).error(function(data, status, headers, config) {
					console.log(data, status, headers, config);
				});
			};
		} ]);