pfp
		.controller(
				'DDO',
				[
						'$scope',
						'$http',
						'$location',
						'templates',
						function($scope, $http, $location, templates) {
							var templateNew = new Array();
							for (i = 0; i < templates.data.data.length; i++) {
								if (templates.data.data[i].status == "DDO Ready") {
									templateNew.push(templates.data.data[i])
									$scope.downloadFile = "Download Template";
								}
							}
							if (templateNew != null) {
								$scope.requests = templateNew;
							}
							$scope.accept = function(request) {
								request.status = "Completely Ready";
								$http({
									method : 'POST',
									url : 'rest/template/update',
									data : request,
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													newData = data;
													alert("The template completely ready for the release!");
													$location.path('/ddo/');
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
							$scope.reject = function(request) {
								request.status = "GEO ready";
								$http({
									method : 'POST',
									url : 'rest/template/update',
									data : request,
									responseType : 'json'
								})
										.success(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
													alert("Template is not accepted and sent to Geo Spatial analyst for further updates.");
													$location.path('/ddo/');
												}).error(
												function(data, status, headers,
														config) {
													console.log(data, status,
															headers, config);
												});
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
						} ]);