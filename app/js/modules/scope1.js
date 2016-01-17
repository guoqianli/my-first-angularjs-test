var GreetCtrl = ['$scope', '$rootScope', function($scope, $rootScope) {
	$scope.name = 'World';
	$rootScope.department = 'Anguler';
}]
var ListCtrl = ['$scope', function($scope) {
	$scope.names = ['Igor', 'Misko', 'Vojta'];
}]