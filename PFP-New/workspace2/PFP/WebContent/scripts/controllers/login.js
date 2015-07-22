pfp.controller('Login', [
		'$scope',
		'$location',
		'users',
		function($scope, $location, users) {
			$scope.login = function() {
				for (i = 0; i < users.data.data.length; i++) {
					if ($scope.email == users.data.data[i].username
							&& $scope.password == users.data.data[i].password
							&& users.data.data[i].id == 1) {
						$location.path('/fdoHome/');
						return;

					} else if ($scope.email == users.data.data[i].username
							&& $scope.password == users.data.data[i].password
							&& users.data.data[i].id == 2) {
						$location.path('/missionManager/');
						return;
					} else if ($scope.email == users.data.data[i].username
							&& $scope.password == users.data.data[i].password
							&& users.data.data[i].id == 3) {
						$location.path('/imManager/');
						return;
					} else if ($scope.email == users.data.data[i].username
							&& $scope.password == users.data.data[i].password
							&& users.data.data[i].id == 4) {
						$location.path('/ddo/');
						return;
					} else if ($scope.email == users.data.data[i].username
							&& $scope.password == users.data.data[i].password
							&& users.data.data[i].id == 5) {
						$location.path('/geoSpatial/');
						return;
					} else if ($scope.email == users.data.data[i].username
							&& $scope.password == users.data.data[i].password
							&& users.data.data[i].id == 6) {
						$location.path('/fdrHome/');
						return;
					}
				}
				alert("Wrong email and password!!");
				$location.path('/login/');
			}
		} ]);