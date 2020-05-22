const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    //store user in session
    passport.serializeUser((user, done) => {
        console.log("abc1");
        done(null, user);
    });

    //retrive user in session
    passport.deserializeUser((user, done) => {
        console.log("def1" + JSON.stringify(user));
        done(null, user);
    });

}