(function () {
  'use strict';

  var app = angular.module('bgca_reporting');
  app.controller('gameTechPostSurveySchoolResultsCtrl', function($scope, $http, gameTechSchoolData) {
    $scope.data = {};

    $scope.chart_options = {};
    $scope.chart_data = [];

    $scope.grades = {};

    $scope.get_grade_data = function() {
        
      console.log('fetching info');
      gameTechSchoolData.post_survey().then(function(data) {
        $scope.grades = data;
      });
    };

    $scope.get_grade_data();
  });
 
}());