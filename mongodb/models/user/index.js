// grab mongoose
let mongoose = require('mongoose'),
Schema = mongoose.Schema;

// the User Schema

let UserSchema = new Schema({
        name: { type: String, default: '_none'},
        password: { type: String, default: '1234'},
        createDate: { type: Date, default: Date.now},
        lastOn: { type: Date, default: Date.now}
    });

// PRE hooks

// Must have a name
UserSchema.pre('save', function (next) {

    let e = null;

    if (this.name === '_none' || !this.name) {

        e = new Error('name equals the default value _none, or evaluates to false');

    }

    next(e);

});

// The name must begin with a lowercase letter, and can not be longer than ten chars
UserSchema.pre('save', function (next) {

    let e = null;

    if (!this.name.match(/^[a-d]/) || this.name.length > 10) {

        e = new Error('must begin with a lowercase letter');

    }

    next(e);

});

// can not have a name that is taken
UserSchema.pre('save', function (next) {

    //console.log(UserSchema);
    User.find({
        name: this.name
    }, function (e, user) {

        if (e) {

            next(e);

        } else {

            if (user.length > 0) {

                next(new Error('The username given is taken'));

            } else {

                next(null);

            }

        }

    })

});

// Static Methods:

// find by name
UserSchema.statics.findByName = function (name, cb) {

    return this.find({
        name: name
    }, cb);

};

// create a Model
let User = mongoose.model('User', UserSchema);

// export it
module.exports = User;
