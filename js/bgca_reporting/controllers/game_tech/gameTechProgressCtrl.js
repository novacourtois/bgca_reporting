(function () {
  'use strict';

  var app = angular.module('bgca_reporting');
  app.controller('gameTechProgressCtrl', function($scope, $http, gameTechGradeData, gameTechSchoolData, chartData) {

    $scope.data = {};

    $scope.chart_options = {};
    $scope.chart_data = [];

    $scope.pre_grades = {};
    $scope.post_grades = {};

    $scope.pre_school = {};
    $scope.post_school = {};

    $scope.get_data = function() {
        
      console.log('fetching info');
      gameTechGradeData.pre_survey().then(function(data) {
        $scope.pre_grades = data;
      });
      gameTechGradeData.post_survey().then(function(data) {
        $scope.pre_grades = data;
      });

      gameTechSchoolData.pre_survey().then(function(data) {
        $scope.pre_grades = data;
      });
      gameTechSchoolData.post_survey().then(function(data) {
        $scope.pre_grades = data;
      });
    };

    $scope.get_grade_data();
    
	});
 
}());