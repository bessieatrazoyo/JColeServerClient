/**
 * Our Schema for Users
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

// Define the User Schema
/*
 * _id is going to be their email address.
 * We need to make each dealer have a unique email address
 */
var userSchema = new Schema({
    _id              : String,
    first_name       : String,
    last_name        : String,
    address_1        : String,
    address_2        : String,
    city             : String,
    state            : String,
    zip_code         : String,
    phone            : String,
    user_role        : Number, // 0/1/2/3 -> 
                               // vehicle owner / dealership / mpp / admin
    updated          : {
        type         : Date,
        default      : Date.now
    },
    created          : {
        type         : Date,
        default      : Date.now
    },
    last_login       : {
        type         : Date,
        default      : Date.now
    },
    local            : {
      email          : { 
        type         : String, // this is the same as username
        trim         : true,
        unique       : true
      },
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
/* If the user updates their profile, this document is created.
 * When the MMP goes through the data, they approve these changes,
 * they are copied to the main document, and this document is deleted.
 * Special care for changing email.  That is also the _id for the user.
 * When this changes, we need to a.) unlink any social accounts
 * (facebook, twitter, google) and then go through contracts and
 * change the owner link
*/
   pending_changes: { 
       first_name   : String,
       last_name    : String,
       address_1    : String,
       address_2    : String,
       city         : String,
       state        : String,
       zip_code     : String,
       phone        : String,
       email_address: String,
       created      : {
           type         : Date
       }
    }

});

// A method that's called every time a user document is saved..
userSchema.pre('save', function (next) {
    console.log('userSchema.pre save 1');

    var user = this;
    console.log('userSchema.pre save 2');
    console.log('user = ' + JSON.stringify(user)); 
    // If the password hasn't been modified, move along...
    if (!user.isModified('local.password')) {
        console.log('userSchema.pre password not modified');
        return next();
    }

    console.log('userSchema.pre password modified');
    // generate salt
    bcrypt.genSalt(10, function(err, salt){

        if (err) {
            console.log('userSchema.pre err from genSalt');
            return next(err);
        }

        console.log('userSchema.pre no err from genSalt');
        // create the hash and store it
        bcrypt.hash(user.local.password, salt, function(err, hash){
            if (err) {
                return next(err);
            }
            console.log('userSchema.pre hash = ' + hash);
            user.local.password = hash;
            next();
        });
    });
});

// Password verification helper
userSchema.methods.comparePassword = function (triedPassword, cb) {
    bcrypt.compare(triedPassword, this.local.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

// Password authenticate
userSchema.methods.authenticate = function(password) {
  bcrypt.compare(password, this.local.password, function(err, isMatch) {
    if (err) {
      return next(err);
    }

    return isMatch;
  });
}

// The primary user model
var User = mongoose.model('User', userSchema);

module.exports = User;

