'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AuthCtrl
 * @description
 * # AuthCtrl
 * Controller of the clientApp
 */
angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
  .controller ('AuthCtrl', [
    '$scope',
    '$http',
    '$state',
    'auth',
    function ($scope, $http, $state, auth) {
      $scope.user = {};
      $scope.register = function () {
        auth.register ($scope.user).error (function (error) {
          $scope.error = error;
        }).then (function () {
          $state.go ('home');
        });
      };

      $scope.logIn = function () {
        auth.logIn ($scope.user).error (function (error) {
          $scope.error = error;
        }).then (function () {
          $state.go ('home');
        });
      };
      
      $scope.twitterLogIn = function () {
console.log("twitterLogIn");
        return $http.get ('/auth/twitter').success (function (data) {
console.log('return from get');
          auth.saveToken (data.token);
        });
      };

      $scope.facebookLogIn = function () {
console.log("facebookLogIn");
        return $http.get ('/auth/facebook').success (function (data) {
console.log('return from get');
          auth.saveToken (data.token);
        });
      };
  }])

  .factory('auth', ['$http', '$window', function ($http, $window) {
    var auth = {};

    auth.saveToken = function (token) {
      console.log('saveToken');
      $window.localStorage['zakhelp-token'] = token;
    };

    auth.getToken = function () {
      return $window.localStorage['zakhelp-token'];
    };

    auth.isLoggedIn = function () {
      var token = auth.getToken();

      if (token) {
        var payload = JSON.parse ($window.atob (token.split ('.')[1]));

        return payload.exp > Date.now() / 1000;
      }
      else {
        return false;
      }
    };

    auth.currentUser = function () {
      if (auth.isLoggedIn ()) {
        var token = auth.getToken ();
        var payload = JSON.parse ($window.atob (token.split ('.')[1]));

        return payload.first_name + ' ' + payload.last_name;  
      } 
    };

    auth.register = function (user) {
      return $http.post ('/register', user).success (function (data) {
        auth.saveToken (data.token);
      });
    };

    auth.logIn = function (user) {
      return $http.post ('/login', user).success (function (data) {
        auth.saveToken (data.token);
      });
    };

    auth.logOut = function () {
      $window.localStorage.removeItem('zakhelp-token');
    };

    return auth;
  }]);



