// list users
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    User = require('../models/user'),
    cb = function (e, users) {

        if (e) {

            console.log('error listing users');

        } else {

            console.log('users');
            console.log(users);

        }

        db.close();

    };

    if (process.argv[2]) {

        User.findByName(process.argv[2], cb);

    } else {

        User.find({}, cb);

    }

}).catch (function (e) {

    console.log(e);

});
