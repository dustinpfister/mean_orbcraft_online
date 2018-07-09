// connect to mongodb with mongoose, and then return mongoose
module.exports = (options, cb) => {

    // grab mongoose
    let mongoose = require('mongoose');

    // use give object, or an empty object
    options = options || {};

    // host, port, and database name
    options.host = options.host || 'localhost';
    options.port = options.port || 27017;
    options.db = options.db || 'orbcraft_online';

    // auth
    options.username = options.username || null;
    options.password = options.password || null;
    let logStr = '';
    if (options.username && options.password) {
        logStr = options.username + ':' + options.password + '@';
    }

    // use url override if given, or set string based on other given options or defaults
    options.url = options.url || 'mongodb://' + logStr + options.host + ':' + options.port + '/' + options.db;

    // use of set callback
    cb = cb || function () {};

    // make a connection to mongoDB
    mongoose.connect(options.url, {
        useNewUrlParser: true
    });

    // ref mongoose.connection
    let db = mongoose.connection;

    return new Promise((resolve, reject) => {

        // on error
        db.on('error', (e) => {

            // close database, fire callback with error object, and reject.
            db.close();
            cb(e,null);
            reject(e);

        });

        // once the database is open
        db.once('open', () => {

            //  fire any given callback, and resolve with mongoose
            // do not close connection to database
            cb(null, mongoose);
            resolve(mongoose);

        });

    });

};
