// create a user
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    User = require('../models/user'),

    // create the user
    usr = new User({name: process.argv[2] || null});

    // save the user
    usr.save(function (e, usr) {

        if (e) {

            console.log('create: error');
            console.log(e.message);

        } else {

            console.log('create: saved new user');
            console.log(usr);

        }

        db.close();

    });

}).catch (function (e) {

    console.log(e.message);

});
