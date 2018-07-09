// drop all users
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    User = require('../models/user');

    User.deleteMany({}, function (e) {

        if (e) {

            console.log('error deleteing users');
            console.log(e);

        } else {

            console.log('users deleted');

        }

        db.close();

    });

}).catch (function (e) {

    console.log(e);

});
