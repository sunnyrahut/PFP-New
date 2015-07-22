pfp
		.controller(
				'GeoSpatial',
				[
						'$scope',
						'$http',
						'$location',
						'templates',
						function($scope, $http, $location, templates) {
							var templateNew = new Array();
							for (i = 0; i < templates.data.data.length; i++) {
								if ((templates.data.data[i].status == "GEO ready")
										|| (templates.data.data[i].status == "approved")) {
									templateNew.push(templates.data.data[i]);
									$scope.downloadFile = "Download Template";
								}
							}
							console.log(templateNew);
							if (templateNew != null) {
								$scope.requests = templateNew;
							}
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
							$scope.getFile = function() {
								$http(
										{
											method : 'GET',
											url : 'rest/template/getFile' + '/'
													+ $scope.templateCountry
													+ '/'
													+ $scope.templatePlatform
													+ '/'
													+ $scope.templateSensor,
											responseType : 'json'
										})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													$scope.download = "Download Template";
													$scope.template = data.data;
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							};
							$scope.logout = function() {
								$location.path('/login/');
							};
							$scope.updateFile = function(template) {
								var obj = {
									"templateId" : template.templateId,
									"templateCountry" : template.templateCountry,
									"templateFile" : reader.result,
									"status" : "IMS Ready",
									"rules" : template.rules,
									"sensor" : template.sensor,
									"comments" : template.comments
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
													alert("Template file has been updated and sent to Imagery mission manager for the review");
													$location
															.path('/geoSpatial/');
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
							}
						} ]);