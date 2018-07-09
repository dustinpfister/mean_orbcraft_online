// drop all orbs
require('../lib/connect')(require('../connect.json')).then(function (mongoose) {

    let db = mongoose.connection,
    Orb = require('../models/orb');

    Orb.deleteMany({}, function (e) {

        if (e) {

            console.log('error deleteing orbs');
            console.log(e);

        } else {

            console.log('orbs deleted');

        }

        db.close();

    });

}).catch (function (e) {

    console.log(e);

});
