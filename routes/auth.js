const jwt = require('jsonwebtoken');
const mysql = require("mysql");

// Creating connection to the database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

const auth = async (req, res, next) =>{
    try {
        // GET the cookie from the website
        const token = req.cookies.jwt;
        if(token){
            console.log(`the cookie found is ${token.token}`);
        }else{
            console.log("no cookie found - plz login to access")
        }
        
        // Simply verify the above token
        const verifyUser = jwt.verify(token.token, process.env.SECRET_KEY_JWT)
        console.log(verifyUser)        // since i have made token from email so it gives the eamil afer verifying

        const user = await db.query('SELECT * FROM users WHERE email = ?', [verifyUser.email], async (error, results) => {
            if(error){
                console.log(error)                
            }
            if(results.length > 0){
                const result =  Object.values(JSON.parse(JSON.stringify(results)));
                // console.log(result)                
                return result
            }            
        })
        console.log("\n\n\nuser :::")                    
        // console.log(user)                    

        req.token = token;
        req.user = user;
                
        next();

    } catch (error) {
        res.render('log-in', {success_msg: '', err_msg: ''});        
    }
}

module.exports = auth;