'use strict';

angular.module('clientApp') // make sure this is set to whatever it is in your client/scripts/app.js
  .controller('SignupCtrl', function ($scope, $http) { // note the added $http depedency
    
    // Here we're creating some local references
    // so that we don't have to type $scope every time
    var user,
        signup;

    // Here we're creating a scope for our Signup page.
    // This will hold our data and methods for this page.
    //$scope.signup = signup = {};

    // In our signup.html, we'll be using the ng-model
    // attribute to populate this object.
    //signup.user = user = {};

    // Stuff added:
    signup = this;
    user = signup.user = {};

    // This is our method that will post to our server.
    signup.submit = function () {
    console.log('I got to sign up');
      
    console.log('objects = ' + JSON.stringify(user));
      // make sure all fields are filled out...
      // aren't you glad you're not typing out
      // $scope.signup.user.firstname everytime now??
      if (
        !user.first_name ||
        !user.last_name ||
        !user.local.email ||
        !user.password1 ||
        !user.password2
      ) {
        console.log('All the fields aren\'t filled out');
        console.log('user.first_name = ' + user.first_name);
        console.log('user.last_name = ' + user.last_name);
        console.log('user.email = ' + user.local.email);
        console.log('user.password1 = ' + user.password1);
        console.log('user.password2 = ' + user.password2);
        return false;
      }

      // make sure the passwords match match
      if (user.password1 !== user.password2) {
        console.log('The passwords aren\'t the same');
        return false;
      }

      // make sure password is longer than 8 characters
      if (user.password1.length < 8) {
        console.log('The password is only ' + user.password1.length + ' long.');
        return false;
      }

      // Just so we can confirm that the bindings are working
      console.log(user);

      // Make the request to the server ... which doesn't exist just yet
      var request = $http.post('/signup', user);

      // we'll come back to here and fill in more when ready
      request.success(function (data) {
        console.log(data);
      });

      request.error(function (data) {
        console.log(data);
      });

    };
    
  });
