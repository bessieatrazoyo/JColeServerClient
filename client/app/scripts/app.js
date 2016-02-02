'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ui.router'
  ])
  .config ([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state ('home', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })
        .state ('signup', {
          url: '/signup',
          templateUrl: 'views/signup.html',
          controller: 'SignupCtrl',
          controllerAs: 'signup'
        })
        .state ('profile', {
          url: '/profile',
          templateUrl: 'views/profile.html',
          controller: 'ProfileCtrl',
          controllerAs: 'profile'
        })
        .state ('login', {
          url: '/login',
          templateUrl: 'views/login.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'auth', function ($state, auth) {
            if (auth.isLoggedIn ()) {
              $state.go ('home');
            }
          }]
        })
        .state ('register', {
          url: '/register',
          templateUrl: 'views/register.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'auth', function ($state, auth) {
console.log('#26');
console.log('$state = ' + $state);
console.log('auth = ' + auth);
            if (auth.isLoggedIn()) {
console.log('#27');
              $state.go ('home');
            }
          }]
        });

      $urlRouterProvider.otherwise('/');
    }
  ]);
/*angular
  .module('clientApp', [
    'ui.router'
  ])
  .config ([
    '$stateProvider',
    '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state ('home', {
          url: '/index.html',
          templateUrl: 'views/main.html',
          controller: 'MainCtrl',
          controllerAs: 'main'
        })

        .state ('login', {
          url: '/login',
          templateUrl: '/login.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'auth', function ($state, auth) {
            if (auth.isLoggedIn ()) {
              $state.go ('home');
            }
          }]
        })

        .state ('register', {
          url: '/register',
          templateUrl: '/register.html',
          controller: 'AuthCtrl',
          onEnter: ['$state', 'auth', function ($state, auth) {
            if (auth.isLoggedIn ()) {
              $state.go ('home');
            }
          }]
        });

      $urlRouterProvider.otherwise('home');
    }
  ]);
  */
