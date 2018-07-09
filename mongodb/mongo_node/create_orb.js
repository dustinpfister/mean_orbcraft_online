// create an Orb
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    Orb = require('../models/orb'),

    // create the orb
    orb = new Orb();

    // save the day
    orb.save(function (e, orb) {

        if (e) {

            console.log('create: error');
            console.log(e);
            db.close();

        } else {

            console.log('create: saved new orb');
            console.log(orb);
            db.close();

        }

    });

}).catch (function (e) {

    console.log(e);

});
