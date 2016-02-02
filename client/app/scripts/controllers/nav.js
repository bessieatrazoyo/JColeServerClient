'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the clientApp
 */
angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
  .controller ('NavCtrl', [
    '$scope',
    'auth',
    function ($scope, auth) {
console.log('#25');
      $scope.isLoggedIn = auth.isLoggedIn;
      $scope.currentUser = auth.currentUser;
      $scope.logOut = auth.logOut;
  }]);
