var path = require('path');

module.exports = function (app, passport) {

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('server/views/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });

    // =====================================
    // LOGIN ===============================
    // =====================================

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/successRedirect', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/successRedirect', function(req, res){
        res.status(200).json({uemail: req.user.local.email});
    });

    app.get('/login', function(req, res){
        res.status(500).json({message: req.flash('loginMessage')});
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/successRedirect', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    app.get('/signup', function(req, res){
        res.status(500).json({message: req.flash('signupMessage')});
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    console.log(req.isAuthenticated());
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};
