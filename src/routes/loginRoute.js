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
        const username=req.body.username;
        const password=req.body.userpassword;
        console.log(username+" "+password)
        if(username=='garg' && password=='garg'){
            res.redirect('/blogs');
        }else{
            res.redirect('/');
        }
    });
    return loginRouter;
}
module.exports = router;