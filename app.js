// imports 
const express = require('express');
const app = express();
const port = 5002
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');
const Swal = require('sweetalert');
const Swal2 = require('sweetalert2');
const cookieParser = require('cookie-parser');

// importing the database credentials using dotenv
dotenv.config({ path: './.env'});

// creating database object with credintials
// securing the database credentials using dotenv
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

// chechking the connection 
db.connect( (error) => {
    if(error) {
        console.log(error)
    }else {
        console.log("MySQL Connected... ")
    }
})






// Static Files
app.use(express.static('public'))
app.use('/assets/css', express.static(__dirname + 'public/assets/css'))
app.use('/assets/img', express.static(__dirname + 'public/assets/img'))
app.use('/assets/js', express.static(__dirname + 'public/assets/js'))
app.use('/webfonts', express.static(__dirname + 'public/webfonts'))

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// To cookie parser as of middlewares
app.use(cookieParser());

// Set views
app.set('views', './views')
app.set('view engine', 'ejs')

// define routes from routes folder
const pages = require('./routes/pages');
app.use('/', pages);



// app.post('/log-in', (req, res) => {    
//     console.log(req.body)
//     console.log(' Login Successful')    
// })


  
// Listen on port 5001
app.listen(port, () => {
    console.log("Server started on Port "+ port);
})


