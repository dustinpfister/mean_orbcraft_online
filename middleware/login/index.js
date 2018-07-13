// yes this is an express.js app
let express = require('express'),

// I will be using passport, and the local strategy
passport = require('passport'),
Strategy = require('passport-local').Strategy,

// my not so secret secret
secret = 'eeeek',

// the single user record that is hard
// coded in for the sake of this simple demo
user = {
    username: 'foo',
    id: 0,
    password: '123'
},

app = express();

// using body parser to parse the body of incoming post requests
app.use(require('body-parser').urlencoded({
        extended: true // must give a value for extended
    }));

// using express-session for session cookies
app.use(

    require('express-session')(
        {
        name: 'site_cookie',
        secret: secret,
        resave: false,
        saveUninitialized: false,
        cookie: {

            // make session cookies only last 15 seconds
            // for the sake of this demo
            maxAge: 15000

        }
    }));

// using the local strategy with passport
passport.use(

    // calling the constructor given by passport-local
    new Strategy(

        // options for passport local
    {

        // using custom field names
        usernameField: 'user',
        passwordField: 'pass'

    },

        // login method
        function (username, password, cb) {

        if (username === user.username && password.toString() === user.password) {

            return cb(null, user);

        }

        // null and false for all other cases
        return cb(null, false);

    }));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {

    cb(null, user);

});

app.use(passport.initialize());
app.use(passport.session());

app.get('/login',

    function (req, res) {
    res.render('index', {
        layout: 'login',
        user: req.user
    });
});

app.post('/login',
    passport.authenticate('local', {
        // redirect back to /login
        // if login fails
        failureRedirect: '/login'
    }),

    // end up at / if login works
    function (req, res) {
    res.redirect('/');
});

app.get('/logout',
    function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = function (options) {

    options = options || {};
    app.set('views', options.views || '../../views');
    app.set('view engine', 'ejs');

    return app;

};
