const mysql = require('mysql2');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});
connection.connect(function(error){
    if(!!error)
        console.log(error);
    else
        console.log('connected');
});
module.exports = connection;