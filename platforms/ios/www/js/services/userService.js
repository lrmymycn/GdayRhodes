'use strict';

gdayModule.factory('userService', ['localStorageService', function (localStorageService) {

    var LOGGED_IN_USER = "LOGGED_IN_USER";

    var userObj = {
        direction: 1
    };

    return {
        getUser: function () {
            var json = localStorageService.get(LOGGED_IN_USER);

            if(json == ''){
                return null;
            }else{
                return JSON.parse(json);
            }
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

            this.saveUser(user);
        }
    }
}]);