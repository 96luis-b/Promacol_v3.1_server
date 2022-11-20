const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'25342581',
    port:3306,
    database:'promacol_v3'
});

module.exports = db
