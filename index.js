const mysql = require("mysql");
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars');

app.use(bodyparser.json());

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
});


app.listen(3003, () => console.log("Express server is running at port no, 3000"));

// GET data from database
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, rows, fields) => {
        if(!err)
        // console.log(db);
        res.send(rows)
        else
        console.log(err);
    })
});




// Static Files
app.use(express.static('public'))
app.use('/assets/css', express.static(__dirname + 'public/assets/css'))
app.use('/assets/img', express.static(__dirname + 'public/assets/img'))
app.use('/assets/js', express.static(__dirname + 'public/assets/js'))
app.use('/webfonts', express.static(__dirname + 'public/webfonts'))

// Set views
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    // res.sendFile(__dirname + '/views/index.html');  // to view html file
    // res.send('Hello Worl aa')
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/log-in', (req, res) => {    
    res.render('log-in')
})

app.get('/sign-up', (req, res) => {    
    res.render('sign-up')
})

app.post('/', (req, res) => {    
    console.log('hiiiiiiiiiiiiiiiii')     // not working 
})