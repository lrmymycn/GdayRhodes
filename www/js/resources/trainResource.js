'use strict';

gdayModule.factory('trainResource', ['$http', 'appSettings', function ($http, appSettings) {
    return {
        getNextTrainByDirection: function(direction){
            return $http.get(this.getApiPath() + 'train/nextTrain?toCity='+direction);
        },

        getApiPath: function () {
            return appSettings.apiRoot;
        }
    };
}]);


