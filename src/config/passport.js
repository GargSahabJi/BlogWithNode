const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(
        function (username, userpassword, done) {
            console.log(username)
            if (username == 'garg' && userpassword == 'garg') {
                return done(null, 'garg');
            }
            else {
                return done(null, false);
            }
        }));
    passport.serializeUser((username, userpassword, done) => {
        done(null, username);
    });
    passport.deserializeUser((username, done) => {
        done(null, username);
    });
}