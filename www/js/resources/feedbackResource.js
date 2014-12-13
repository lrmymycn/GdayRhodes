'use strict';

gdayModule.factory('feedbackResource', ['$http', 'appSettings', function ($http, appSettings) {
    return {
        post: function(feedback){
            return $http.post(this.getApiPath(), feedback);
        },

        getApiPath: function () {
            return appSettings.apiRoot + 'feedback';
        }
    };
}]);