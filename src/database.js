// const { Pool } = require('pg');

// const db = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: '25342581',
//     database: 'promacol_v3',
//     port: '5432'
// })


// module.exports = db;


// import mysql from 'mysql'
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'25342581',
//     port:3306,
//     database:'promacol_v3'
// })

// import mysql from 'mysql'
// // const db = mysql.createConnection({
// //     host:'localhost',
// //     user:'root',
// //     password:'',
// //     port:3306,
// //     database:'promacol_v3'
// // })

// const db = mysql.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'25342581',
    // port:3306,
    // database:'promacol_v3'
// })

// module.exports = db

const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'25342581',
    port:3306,
    database:'promacol_v3'
});

module.exports = db
