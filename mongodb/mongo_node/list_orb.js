// list orbs
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    Orb = require('../models/orb');

    Orb.find({}, function (e, orbs) {

        if (e) {

            console.log('error listing orbs');

        } else {

            console.log('orbs');
            console.log(orbs);

        }

        db.close();

    });

}).catch (function (e) {

    console.log(e);

});
