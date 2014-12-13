'use strict';

gdayModule.controller('feedbackController', ['$scope', 'feedbackResource', function($scope, feedbackResource) {

    $('.bar-header').removeClass('bar-transparent');

    $scope.tags = ['#arrive time is not accurate#', '#suggestions#'];
    $scope.feedback = {
        message: '',
        email: ''
    }

    $scope.addTag = function(tag) {
        $scope.feedback.message += tag + '';
    }

    $scope.sendFeedback = function(){
        feedbackResource.post($scope.feedback).success(function () {
            alert('Thank you for your feedback.');
        });
    }
}]);