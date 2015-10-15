angular.module('bgca',['angular-loading-bar', 'ngAnimate', 'ngRoute', 'nvd3'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/grade-results', {
        templateUrl: 'views/grade_results.html'
    }).
    when('/school-results', {
        templateUrl: 'views/school_results.html',
        controller: 'schoolReportsCtrl'
    }).
    when('/php/schoolAvg.php', {
        templateUrl: '/php/schoolAvg.php'
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


    $scope.chart_options = {
      chart: {
        type: 'pieChart',
        height: 450,
        donut: true,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,

        pie: {
          startAngle: function(d) { return d.startAngle/2 -Math.PI/2 },
          endAngle: function(d) { return d.endAngle/2 -Math.PI/2 }
        },
        transitionDuration: 500,
        legend: {
          margin: {
            top: 5,
            right: 140,
            bottom: 5,
            left: 0
          }
        }
      }
    };

    $scope.chart_data = [
        {
            key: "One",
            y: 5
        },
        {
            key: "Two",
            y: 2
        },
        {
            key: "Three",
            y: 9
        },
        {
            key: "Four",
            y: 7
        },
        {
            key: "Five",
            y: 4
        },
        {
            key: "Six",
            y: 3
        },
        {
            key: "Seven",
            y: .5
        }
    ];


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
})
.controller('schoolReportsCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.selectedCharacter = "Fox";
    $scope.selectedOpponent  = "Falco";
    $scope.data.characters = ["Fox", "Falco", "Sheik", "Marth"];


    $scope.schools = {
      'Burnet':{},
      'a': {},
      'b': {},
      'c': {},
      'd': {},
      'e': {},
      'f': {}
    };


    $scope.number = 8;
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