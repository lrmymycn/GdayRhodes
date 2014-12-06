'use strict';

gdayModule.factory('userService', ['localStorageService', function (localStorageService) {

    var LOGGED_IN_USER = "LOGGED_IN_USER";

    var userObj = {
        direction: 1
    };

    return {
        getUser: function () {
            var json = localStorageService.get(LOGGED_IN_USER);

            console.log(json);

            return json;
        },

        saveUser: function(user){
            var jsonStr = JSON.stringify(user);

            localStorageService.set(LOGGED_IN_USER, jsonStr);
        },

        saveTrainDirection: function(user, direction){
            if(user == null){
                user = userObj;
            }

            user.direction = direction;

            console.log(user);

            this.saveUser(user);
        }
    }
}]);