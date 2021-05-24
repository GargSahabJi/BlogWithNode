const chalk = require('chalk');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '/public/')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'user' }));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
const nav = [
    { link: '/login', title: 'Login' }
];
const blognav = [
    { link: '/blogs', title: 'Blogs' },
    { link: '/logout', title: 'Log Out' }
];
const blogRouter = require('./src/routes/blogRoutes')(blognav);
const loginRouter = require('./src/routes/loginRoute')(nav);
app.use('/blogs', blogRouter);
app.use('/login', loginRouter);
app.get('/', function (req, res) {
    res.render('index',
        {
            nav,
            title: 'Blogs'
        });
});
app.get('/logout', function(req,res){
    res.redirect('/');
})
app.get('/page-not-found', function(req,res){
    res.sendFile(__dirname+'/src/html/pageNotFound.html');
})
app.get('/**', function(req,res){
    res.redirect('/page-not-found');
})

app.listen(port, function () {
    console.log(`Hi, I am listeninig on lisening on ${chalk.red(port)}`);
});