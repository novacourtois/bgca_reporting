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
.factory('gameTechGradeData', function($http) {
   return {
     pre_survey: function() {
       return $http.get('sample_data/grade/grades.json').then(function(result) {
           return result.data;
       });
     },
     post_survey: function() {
       return $http.get('sample_data/grade/grades.json').then(function(result) {
           return result.data;
       });
     },
     chart_options: function() {
       return $http.get('sample_data/grade/grades.json').then(function(result) {
           return result.data;
       });
     },
     chart_type: function() {
       return $http.get('sample_data/grade/grades.json').then(function(result) {
           return result.data;
       });
     }
   }
})
.factory('gameTechSchoolData', function($http) {
   return {
     pre_survey: function() {
       return $http.get('sample_data/school/schools.json').then(function(result) {
           return result.data;
       });
     },
     post_survey: function() {
       return $http.get('sample_data/school/grades.json').then(function(result) {
           return result.data;
       });
     },
     chart_options: function() {
       return $http.get('sample_data/school/grades.json').then(function(result) {
           return result.data;
       });
     },
     chart_type: function() {
       return $http.get('sample_data/school/grades.json').then(function(result) {
           return result.data;
       });
     }
   }
})
.controller('mainCtrl', function($scope, $http) {
    $scope.data = {};

    $scope.chart_options = {};

    $scope.chart_data = [];

})
.controller('gameTechPreSurveySchoolResultsCtrl', function($scope, $http, gameTechSchoolData) {
    $scope.data = {};

    console.log('hello');
    $scope.chart_options = {};

    $scope.chart_data = [];

    $scope.schools = {};

    $scope.get_school_data = function() {        
        console.log('fetching info');
        gameTechSchoolData.pre_survey().then(function(data) {
            console.log(data);
            $scope.schools = data;
        });
    };

    $scope.get_school_data();
})
.controller('gameTechPreSurveyGradeResultsCtrl', function($scope, $http, gameTechGradeData) {
    $scope.data = {};

    $scope.chart_options = {};

    $scope.chart_data = [];

    $scope.grades = {};

    $scope.get_grade_data = function() {
        
        console.log('fetching info');
        gameTechGradeData.pre_survey().then(function(data) {
            $scope.grades = data;
        });
    };

    $scope.get_grade_data();
});