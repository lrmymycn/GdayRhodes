// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var gdayModule = angular.module('gday', ['ionic','LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.constant('appSettings', {
  apiRoot: 'http://gday.stagingserver.com.au/'
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'appController'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'homeController'
        }
      }
    })

    .state('app.feedback', {
      url: "/feedback",
      views: {
        'menuContent' :{
          templateUrl: "templates/feedback.html",
          controller: 'feedbackController'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

