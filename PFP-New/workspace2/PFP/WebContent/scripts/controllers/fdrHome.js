var reader;
pfp
		.controller(
				'FDRHome',
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
								if (requests.data.data[i].status == "updated") {
									templateFile.push(requests.data.data[i]);
								}
							}
							$scope.requests = templateFile;
							$scope.acceptRequest = function(request) {
								var obj = {
									"templateId" : request.templateId,
									"templateCountry" : request.templateCountry,
									"templateFile" : request.templateFile,
									"status" : "validated",
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
													alert("Template is approved by the FDR and sent to FDO");
													$location.path('/fdrHome/');
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
													alert("Template is rejected by the FDR and is sent back to mission manager for further update.");
													$location.path('/fdrHome/');
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
						} ]);