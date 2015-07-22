var reader;
pfp
		.controller(
				'FDOHome',
				[
						'$scope',
						'$http',
						'$location',
						'requests',
						function($scope, $http, $location, requests) {
							var templateFile = new Array();
							var templateNoFile = new Array();
							console.log(requests);
							for (i = 0; i < requests.data.data.length; i++) {
								if (requests.data.data[i].templateFile == null) {
									templateNoFile.push(requests.data.data[i]);
								} else {
									templateFile.push(requests.data.data[i]);
								}
							}
							console.log(templateFile);
							$scope.requests = templateFile;
							$scope.requestsNone = templateNoFile;
							$scope.addRequest = function() {
								var obj = {
									"templateCountry" : $scope.templateCountry,
									"templateFile" : null,
									"status" : "initialized",
									"rules" : $scope.templatePlatform,
									"sensor" : $scope.templateSensor,
									"comments" : $scope.comments
								};
								$http({
									method : 'POST',
									url : 'rest/template/add',
									data : obj,
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													alert("Template description is created and sent to the Mission Manager");
													$location.path('/fdoHome/');
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							};
							$scope.acceptRequest = function(request) {
								var obj = {
									"templateId" : request.templateId,
									"templateCountry" : request.templateCountry,
									"templateFile" : request.templateFile,
									"status" : "approved",
									"rules" : request.rules,
									"sensor" : request.sensor,
									"comments" : request.comments
								};
								$http({
									method : 'POST',
									url : 'rest/template/update',
									data : obj,
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													alert("Template is approved by the FDO");
													$location.path('/fdoHome/');
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							};
							$scope.rejectRequest = function(request) {
								var obj = {
									"templateId" : request.templateId,
									"templateCountry" : request.templateCountry,
									"templateFile" : request.templateFile,
									"status" : "initialized",
									"rules" : request.rules,
									"sensor" : request.sensor,
									"comments" : request.comments
								};
								$http({
									method : 'POST',
									url : 'rest/template/update',
									data : obj,
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													alert("Template is rejected by the FDO and is sent back to mission manager for further update.");
													$location.path('/fdoHome/');
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							};
							$scope.deleteRequest = function(id) {
								$http({
									method : 'POST',
									url : 'rest/template/delete/' + id,
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													alert("Template request deleted!");
													$location.path('/fdoHome/');
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							};
							$scope.openSocket = function() {
								$http({
									method : 'POST',
									url : 'rest/template/socket',
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							}
							$scope.logout = function() {
								$location.path('/login/');
							}
							$scope.editRequest = function(id) {
								$location.path('/editRequest/' + id);
							}
						} ]).directive("fileread", [ function() {
			return {
				scope : {
					fileread : "="
				},
				link : function(scope, element, attributes) {
					element.bind("change", function(changeEvent) {
						reader = new FileReader();
						reader.onload = function(loadEvent) {
							scope.$apply(function() {
								scope.fileread = loadEvent.target.result;
							});
						}
						reader.readAsDataURL(changeEvent.target.files[0]);
					});
				}
			}
		} ]);