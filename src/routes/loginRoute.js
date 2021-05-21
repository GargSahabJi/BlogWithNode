var express = require('express');
const loginRouter = express.Router();
function router(nav) {
    loginRouter.route('/').get((req, res) => {
        res.render('login',
            {
                nav,
                title: 'Login'
            });
    });
    loginRouter.post('/auth', (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/blogs',
            failureRedirect: '/'
        })(req, res, next)
    });
    return loginRouter;
}
module.exports = router;