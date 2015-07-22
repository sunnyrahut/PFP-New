pfp
		.controller(
				'IMManager',
				[
						'$scope',
						'$http',
						'$location',
						'templates',
						function($scope, $http, $location, templates) {
							var templateNew = new Array();
							for (i = 0; i < templates.data.data.length; i++) {
								if (templates.data.data[i].status == "IMS Ready") {
									templateNew.push(templates.data.data[i])
									$scope.downloadFile = "Download Template";
								}
							}
							if (templateNew != null) {
								$scope.requests = templateNew;
							}
							console.log(templateNew);
							$scope.accept = function(request) {
								console.log(request);
								request.status = "DDO Ready";
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
													alert("The template has been accepted and sent to DDO for further review");
													$location
															.path('/imManager/');
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
													$location
															.path('/imManager/');
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