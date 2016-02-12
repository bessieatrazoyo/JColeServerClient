// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1520358174927230', // your App ID
        'clientSecret'  : '7b06848e59932e85841c3feacb16a23b', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'M4WDc6Y0Cr1W7evsF3hwhworj',
        'consumerSecret'    : 'QeBFuOUH5qiibBSD9Fno8WHKRIDpY09ebNZvRdZ5SYxqCTDt9j',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
