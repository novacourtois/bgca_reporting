angular.module('bgca',['angular-loading-bar', 'ngAnimate', 'ngRoute', 'nvd3'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
    }).
    when('/game-tech/pre-survey/grade-results/', {
        templateUrl: 'views/game_tech/pre_survey/grade_results.html',
        controller : 'gameTechPreSurveyGradeResultsCtrl'
    }).
    when('/game-tech/pre-survey/school-results', {
        templateUrl: 'views/game_tech/pre_survey/school_results.html',
        controller: 'gameTechPreSurveySchoolResultsCtrl'
    }).
    when('/game-tech/post-survey/grade-results/', {
        templateUrl: 'views/waiting.html'
    }).
    when('/game-tech/post-survey/school-results', {
        templateUrl: 'views/waiting.html'
    }).
    when('/game-tech/progress-results/', {
        templateUrl: 'views/waiting.html'
    }).
    when('/clay-tech/pre-survey/grade-results/', {
        templateUrl: 'views/waiting.html'
    }).
    when('/clay-tech/pre-survey/school-results', {
        templateUrl: 'views/waiting.html'
    }).
    when('/clay-tech/post-survey/grade-results/', {
        templateUrl: 'views/waiting.html'
    }).
    when('/clay-tech/post-survey/school-results', {
        templateUrl: 'views/waiting.html'
    }).
    when('/clay-tech/progress-results/', {
        templateUrl: 'views/waiting.html'
    }).
    when('/php/schoolAvg.php', {
        templateUrl: '/php/schoolAvg.php'
    }).
    otherwise({
        redirectTo: '/'
    });
}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;
  }])
.factory('gameTechGradeData', function($http) {
   return {
     pre_survey: function() {
       return $http.get('sample_data/grade/grade_6.json').then(function(result) {
           return result.data;
       });
     },
     post_survey: function() {
       return $http.get('sample_data/grade/grade_6.json').then(function(result) {
           return result.data;
       });
     },
     chart_options: function() {
       return $http.get('sample_data/grade/grade_6.json').then(function(result) {
           return result.data;
       });
     },
     chart_type: function() {
       return $http.get('sample_data/grade/grade_6.json').then(function(res-ult) {
           return result.data;
       });
     }
   }
})
.factory('gameTechSchoolData', function($http) {
   return {
     pre_survey: function() {
       return $http.get('sample_data/schoool/grade_6.json').then(function(result) {
           return result.data;
       });
     },
     post_survey: function() {
       return $http.get('sample_data/school/grade_6.json').then(function(result) {
           return result.data;
       });
     },
     chart_options: function() {
       return $http.get('sample_data/school/grade_6.json').then(function(result) {
           return result.data;
       });
     },
     chart_type: function() {
       return $http.get('sample_data/school/grade_6.json').then(function(res-ult) {
           return result.data;
       });
     }
   }
})
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
.controller('gameTechPreSurveySchoolResultsCtrl', function($scope, $http) {
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
.controller('gameTechPreSurveyGradeResultsCtrl', function($scope, $http) {
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