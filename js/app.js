angular.module('bgca',['angular-loading-bar', 'ngAnimate', 'ngRoute', 'nvd3'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/grade-results', {
        templateUrl: 'views/grade_results.html',
        controller : 'gradeResultsCtrl'
    }).
    when('/school-results', {
        templateUrl: 'views/school_results.html',
        controller: 'schoolResultsCtrl'
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
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
.controller('mainCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.chart_options = {
      chart: {
        type: 'pieChart',
        height: 450,
        donut: true,
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: true,
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

})
.controller('schoolResultsCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.chart_options = {
            chart: {
                type: 'discreteBarChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Grade'
                },
                yAxis: {
                    axisLabel: 'Average',
                    axisLabelDistance: 30
                }
            }
        };

    $scope.chart_data = [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label" : "6th" ,
                    "value" : 1.1 / 6 * 100
                } ,
                {
                    "label" : "7th" ,
                    "value" : 1 / 6  * 100
                } ,
                {
                    "label" : "8th" ,
                    "value" : 2 / 6 * 100
                } ,
                {
                    "label" : "School" ,
                    "value" : 1.5 / 6 * 100
                }
            ]
        }
    ];


    $scope.schools = {
      'burnet':{},
      'mendez': {}
    };

    $scope.get_school_data = function(school) {
        
        console.log('fetching info');
        $http.get('sample_data/school/'+school+'_data.json')
        .success(function (data, status) {
            console.log('fetching info worked');
            console.log(data);
            console.log(status);

            $scope.schools[school] = data;
            
        })
        .error(function (data, status){
            console.log('fetching info failed');
        });
    };


    angular.forEach($scope.schools, function(value, key) {
        $scope.get_school_data(key);
    });
})
.controller('gradeResultsCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.chart_options = {
            chart: {
                type: 'discreteBarChart',
                height: 300,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 55
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'Grade'
                },
                yAxis: {
                    axisLabel: 'Average',
                    axisLabelDistance: 30
                }
            }
        };

    $scope.chart_data = [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label" : "6th" ,
                    "value" : 1.1 / 6 * 100
                } ,
                {
                    "label" : "7th" ,
                    "value" : 1 / 6  * 100
                } ,
                {
                    "label" : "8th" ,
                    "value" : 2 / 6 * 100
                } ,
                {
                    "label" : "School" ,
                    "value" : 1.5 / 6 * 100
                }
            ]
        }
    ];


    $scope.grades = {};



    $scope.get_grade_data = function() {
        
        console.log('fetching info');
        $http.get('sample_data/grade/grade_6.json')
        .success(function (data, status) {
            $scope.grades = data;
            console.log(data);
            
        })
        .error(function (data, status){
            console.log('fetching info failed');
        });
    };

    $scope.get_grade_data();
});