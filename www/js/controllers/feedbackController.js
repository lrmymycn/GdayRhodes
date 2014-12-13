'use strict';

gdayModule.controller('feedbackController',
    ['$scope', '$rootScope', '$ionicPopup', 'feedbackResource', function($scope, $rootScope, $ionicPopup, feedbackResource) {

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
        $rootScope.loadingShow();

        feedbackResource.post($scope.feedback).success(function () {
            $rootScope.loadingHide();
            $ionicPopup.alert({
                title: 'Notes',
                template: 'Thanks for your feedback'
            }).then(function(){
                //reset the form
                $scope.feedback = {
                    message: '',
                    email: ''
                }
            });
        });
    }
}]);