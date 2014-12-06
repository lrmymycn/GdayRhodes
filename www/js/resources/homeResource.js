'use strict';

gdayModule.factory('homeResource', ['$http', 'appSettings', function ($http, appSettings) {
    return {
        getNextTrainByDirection: function(direction){
            return $http.get(this.getApiPath() + '?toCity=' + direction);
        },

        getApiPath: function () {
            return appSettings.apiRoot;
        }
    };
}]);


