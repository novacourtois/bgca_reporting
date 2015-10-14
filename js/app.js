angular.module('bgca',['angular-loading-bar', 'ngAnimate', 'ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/about', {
        templateUrl: 'views/about.html'
    }).
    when('/contact', {
        templateUrl: 'views/contact.html'
    }).
    when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}])
.controller('mainCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.selectedCharacter = "Fox";
    $scope.selectedOpponent  = "Falco";
    $scope.data.characters = ["Fox", "Falco", "Sheik", "Marth"];


    $scope.number = 100;
$scope.getNumber = function(num) {
    return new Array(num);   
}

    $scope.matchups = function() {
        
        console.log('fetching info');
        $http.get('php/matchups.php?character='+$scope.selectedCharacter+'&opponent='+$scope.selectedOpponent)
        .success(function (data, status) {
            console.log('fetching info worked');
            console.log(data);
            console.log(status);
            $scope.data.characterTips = data.characterTips;
            $scope.data.opponentTips = data.opponentTips;
            $scope.data.characterPercentage = data.percentage;
            $scope.data.opponentPercentage = 100 - data.percentage;
        })
        .error(function (data, status){
            console.log('fetching info failed');
        });
    }

    $scope.matchups();
});