// create an Orb
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    Orb = require('../models/orb'),

    // create the orb
    orb = new Orb({owner: process.argv[2] || null});

    // save the day
    orb.save(function (e, orb) {

        if (e) {

            console.log('create: error');
            console.log(e.message);

        } else {

            console.log('create: saved new orb');
            console.log(orb);

        }

        db.close();

    });

}).catch (function (e) {

    console.log(e.message);

});
