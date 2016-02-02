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
    '$state',
    'auth',
    function ($scope, $state, auth) {
      $scope.user = {};

console.log('#1');
      $scope.register = function () {
console.log('#2');
console.log('$scope.user = ' + JSON.stringify($scope.user));
        auth.register ($scope.user).error (function (error) {
console.log('#3');
          $scope.error = error;
        }).then (function () {
console.log('#4');
          $state.go ('home');
        });
      };

      $scope.logIn = function () {
console.log('#5');
        auth.logIn ($scope.user).error (function (error) {
console.log('#6');
          $scope.error = error;
        }).then (function () {
console.log('#7');
          $state.go ('home');
        });
      };
  }])

  .factory('auth', ['$http', '$window', function ($http, $window) {
console.log('#8');
    var auth = {};

    auth.saveToken = function (token) {
console.log('#9');
      $window.localStorage['zakhelp-token'] = token;
    };

    auth.getToken = function () {
console.log('#10');
      return $window.localStorage['zakhelp-token'];
    };

    auth.isLoggedIn = function () {
console.log('#11');
      var token = auth.getToken();

      if (token) {
console.log('#12');
        var payload = JSON.parse ($window.atob (token.split ('.')[1]));

        return payload.exp > Date.now() / 1000;
      }
      else {
console.log('#13');
        return false;
      }
    };

    auth.currentUser = function () {
console.log('#14');
      if (auth.isLoggedIn ()) {
console.log('#15');
        var token = auth.getToken ();
        var payload = JSON.parse ($window.atob (token.split ('.')[1]));

        return payload.first_name + ' ' + payload.last_name;  
      } 
console.log('#16');
    };

    auth.register = function (user) {
console.log('#17');
console.log('user = ' + JSON.stringify(user));
      return $http.post ('/register', user).success (function (data) {
console.log('#18');
        auth.saveToken (data.token);
      });
    };

    auth.logIn = function (user) {
console.log('#20');
      return $http.post ('/login', user).success (function (data) {
console.log('#21');
        auth.saveToken (data.token);
      });
    };

    auth.logOut = function () {
console.log('#23');
      $window.localStorage.removeItem('zakhelp-token');
    };

console.log('#24');
    return auth;
  }]);
