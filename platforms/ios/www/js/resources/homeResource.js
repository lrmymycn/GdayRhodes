'use strict';

gdayModule.factory('homeResource', ['$http', 'appSettings', function ($http, appSettings) {
    return {
        getHome: function(direction){
            return $http.get(this.getApiPath() + '?toCity=' + direction);
        },

        getApiPath: function () {
            return appSettings.apiRoot;
        }
    };
}]);


