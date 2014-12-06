'use strict';

gdayModule.factory('userService', ['localStorageService', function (localStorageService) {

    var LOGGED_IN_USER = "LOGGED_IN_USER";

    var userObj = {
        toCity: 1
    };

    return {
        getUser: function () {
            var json = localStorageService.get(LOGGED_IN_USER);

            console.log('get user: ' + json);

            return json;
        },

        saveUser: function(user){
            var jsonStr = JSON.stringify(user);

            localStorageService.set(LOGGED_IN_USER, jsonStr);
        },

        saveTrainDirection: function(user, toCity){
            if(user == null){
                user = userObj;
            }

            user.toCity = toCity;

            console.log('save user: ' + user);

            this.saveUser(user);
        }
    }
}]);