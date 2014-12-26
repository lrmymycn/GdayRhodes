'use strict';

gdayModule.controller('feedbackController',
    ['$scope', '$rootScope', '$ionicPopup', 'feedbackResource',
        function($scope, $rootScope, $ionicPopup, feedbackResource) {

        var MAX_MESSAGE_LENGTH = 20;

        $('.bar-header').removeClass('bar-transparent');

        $scope.tags = ['#arrive time is not accurate#', '#suggestions#'];
        $scope.feedback = {
            message: '',
            email: ''
        }

        $scope.addTag = function(tag) {
            var newMessage = $scope.feedback.message + tag;

            if(checkMessageLength(newMessage)) {
                $scope.feedback.message = newMessage;
            }
        }

        $scope.onMessageChange = function(){
            if(!checkMessageLength($scope.feedback.message)){
                $scope.feedback.message = $scope.feedback.message.substring(0, MAX_MESSAGE_LENGTH);
            }
        }

        $scope.onMessageKeyUp = function($event){
            var $textarea = $($event.target);
            var message = $textarea.val();

            if(!checkMessageLength(message)){
                message = message.substring(0, MAX_MESSAGE_LENGTH);
                $textarea.val(message).blur();
            }
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

        var checkMessageLength = function(message){

            if(message.length > MAX_MESSAGE_LENGTH){
                $ionicPopup.alert({
                    title: 'Notes',
                    template: 'The max length of the message is ' + MAX_MESSAGE_LENGTH
                });
                return false;
            }else{
                return true;
            }
        }
    }
]);