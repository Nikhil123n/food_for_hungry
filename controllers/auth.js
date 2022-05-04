// importing necessary libs
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Swal = require('sweetalert');
const Swal2 = require('sweetalert2');
const cookieParser = require('cookie-parser');

// Setting up the api for sendgrid mail - it is used to send mail to users and admins
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Creating connection to the database
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});



// Response to the Register form
exports.register = (req, res) => {
    console.log(req.body);      // it contains the object of user entered data from form    
    
    // creating object to send a message when successful completion of register by users.
    const msg = {
        to: req.body.floatingEmail,         // dynamically send email to users by their email entered
        from: process.env.SEND_MAIL_FROM,    // mail to be sent by 
        subject: 'Your status of registeration at Food-For-Hungry website',
        text: 'Hello '+req.body.floatingName+' your email: '+req.body.floatingEmail+' was successfully registered to food for hungry website',
        html: '<strong>Hello '+req.body.floatingName+' your email: '+req.body.floatingEmail+' was successfully registered to food for hungry website</strong>',
    }

    // storing the user entered data from form to constants
    const { floatingEmail, floatingName, floatingPhoneNo, 
        floatingAge, floatingGender, floatingCategory, floatingPassword, 
        floatingConfirmPassword } = req.body;
    
    // Querying to check that the eamil entered in registered form exists in database or not        
    db.query('SELECT email FROM users WHERE email = ?', [floatingEmail], async (error, results) => {
        if(error) {
            console.log("Error: "+ error);            
        }

        // if the email exists in database then an error to be thrown
        if( results.length > 0) {
            return res.render('sign-up', {
                err_email: 'That email is already in use', 
                email_not_reg_msg: null
            } )
        }

        // encrypting the password entered by user using bcrypt js
        let hashedPassword = await bcrypt.hash(floatingPassword, 8);
        console.log("Password after hashed: "+hashedPassword);

        // Generating tokens
        const token = jwt.sign({email: floatingEmail}, process.env.SECRET_KEY_JWT)                        
        console.log("Token part: "+token)

        // Creating cookie - the res.cookie() function is used to set the cookie name to value.
        // the value parameter may be a string or object converted to JSON.
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 300000),  
            httpOnly: true      
        });        // httpOnly - it says that the client side scripting language cannot do anything with it 
        // 30000 - it is in mili seconds == 30 seconds


        // inserting the registered user data into database table
        db.query('INSERT INTO users SET ?', {email:floatingEmail, name:floatingName, 
            password:hashedPassword, age:floatingAge, phone_no:floatingPhoneNo, 
            gender:floatingGender, category:floatingCategory, tokens:token}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                // console.log(results)    

                msg.html = JSON.stringify(msg.text) 
                msg.text = JSON.stringify(msg.text)
                console.log(msg) 

                // sending the email to user at their registered email
                sgMail.send(msg)
                .then(() => {
                    console.log('Email has been sent to user at their registered email after successful registeration')
                })
                .catch((error) => {
                    console.error(error)
                })       
                return res.status(201).render('log-in', {success_msg: floatingName, err_msg: null});
            }
        })          
    });
};







// Verifying the reponse of login form
exports.loginVerify = (req, res) => {
    console.log(req.body);
    const { floatingEmail, floatingPassword } = req.body;       // assigning user entered data in constants

    // Creating email form to be encountered by an successfull or unsuccessful login
    const msg = {
        to: floatingEmail,      // dynamically send email to users by their email entered        
        from: process.env.SEND_MAIL_FROM,        // mail to be sent by 
        subject: 'Your email: '+floatingEmail+' has tried to access the login',
        text: ""
    }

    // Querying the database to check if the email entered by user to login exists, so to proceed only if exists
    db.query('SELECT id, email, name, password FROM users WHERE email = ?', [floatingEmail], async (error, results) => {
        if(error) {
            console.log(error);            
        }
        
        // If the users tries to login without registering an error will occur
        if( results.length === 0) {
            const str = "Your-email-is-not-yet-registered\nPlease-register-yourself-first"
            console.log(str)
            return res.render('sign-up', {err_email: null, email_not_reg_msg: str})  
        }else {
            const result = Object.values(JSON.parse(JSON.stringify(results)));

            // comparing the password entered by user with the password entered at registeration time
            bcrypt.compare(req.body.floatingPassword, result[0].password, (err, success) => {
                if(err) {
                    console.log(err);            
                }

                console.log(success)

                // Generating tokens
                const token = jwt.sign({email: req.body.floatingEmail}, process.env.SECRET_KEY_JWT)                        
                console.log("Token part: "+token)

                // Creating cookie - the res.cookie() function is used to set the cookie name to value.
                // the value parameter may be a string or object converted to JSON.
                res.cookie("jwt", {token: token, name: result[0].name, id: result[0].id}, {
                    expires: new Date(Date.now() + 3000000),  
                    httpOnly: true
                    // secure:true     // using secure it will make it secure by allowing only http 
                });        // httpOnly - it says that the client side scripting language cannot do anything with it 
                // 30000 - it is in mili seconds == 30 seconds
                            
                if(success){
                    console.log("Login was Sucessfully with email : "+floatingEmail)

                    msg.text = "A new device has logged in successful by your email: "+floatingEmail+', mail us if it was not you who logged in \
 otherwise - ignore this message, if it was you, plz do not reply this msg as it is generated by bots'

                    // sending the email
                    sgMail.send(msg)
                    .then(() => {
                        console.log('Email sent successfully by program after the email: '+floatingEmail+' logged in.')
                        res.render('./myprofile', { isAdded : true } );
                    })
                    .catch((error) => {
                        console.error(error)
                    })                       
                    // return res.redirect(`index?username=${result[0].name}&id=${result[0].id}`)
                }else{
                    console.log("Incorrect Username or Password")
                    return res.render('log-in', {
                        err_msg: 'Incorrect-Username-or-Password', success_msg: null
                    })
                }                
            })                       
        }                                         
    });
}   





// Collecting the response of donate food form
exports.donateFood = (req, res) => {
    console.log(req.body);   
    const userdata = {...req.body};

    // Creating email form to be forwarded to admin, when a user submit the donate food form 
    const msg = {
        to: [process.env.ADMIN_EMAIL1, process.env.ADMIN_EMAIL2], // Change to your recipient
        from: process.env.SEND_MAIL_FROM, // Change to your verified sender
        subject: 'This email is auto-generated as a user with name: '+req.body.donar_name+' has filled the donate \
        food form the followig below items',
        text: userdata
    }

    // Querying the database to check that the form is submitted by user
    db.query('SELECT id, email, name FROM users WHERE email = ?', [req.body.donar_email], async (error, results) => {
        if(error) {
            console.log(error);            
        }
        
        // Validation
        if( results.length === 0) {
            console.log("Email entered must be wrong \nelse\nYour email is not yet registered, Please register yourself first")            
            return res.render('sign-up',  {err_email: null, email_not_reg_msg: null})            
        }else{
            const result = Object.values(JSON.parse(JSON.stringify(results)));

            // form filled by user who has registered to website
            if(req.body.donar_email === result[0].email){

                db.query('INSERT INTO donated_list SET ?', {id:result[0].id, email:result[0].email, name:result[0].name,
                    donar_name:req.body.donar_name, phone_no:req.body.phone_no, 
                    alternate_phone_no:req.body.alternate_phone_no, type_of_food:req.body.type_of_food,
                    quantity:req.body.quantity, date_of_collecting_food:req.body.date_of_collecting_food,
                    street_address:req.body.street_address, pin_zip_code:req.body.zip_code, district_city:req.body.district_city, 
                    state_province:req.body.state_province, remarks:req.body.remarks}, (error, success) => {
                        
                    if(error) {
                        console.log(error);
                    } 

                    if(success) {
                        console.log(success)
                        
                        msg.text = JSON.parse(JSON.stringify(userdata))
                        console.log(msg)

                        sgMail.send(msg)
                        .then(() => {
                            console.log('Email sent after submitting donate us form successfully')
                        })
                        .catch((error) => {
                            console.error(error)
                        })     
                        return res.redirect('myprofile'); 
                    }else{
                        console.log("Some error in sql statements")
                    }
                })
            }            
        }                                     
    });
}







// Collecting the response of request food form
exports.requestFood = (req, res) => {
    console.log(req.body);   
    const userdata = {...req.body};

    // Creating email form to be forwarded to admin, when a user submit the request food form 
    const msg = {
        to: [process.env.ADMIN_EMAIL1, process.env.ADMIN_EMAIL2], // Change to your recipient
        from: process.env.SEND_MAIL_FROM,           // Change to your verified sender
        subject: 'This email is auto-generated as a user with name: '+req.body.req_food_email+' has filled the donate \
        food form the followig below items',
        text: userdata
    }

    // Querying the database to check that the form is submitted by user
    db.query('SELECT id, email, name FROM users WHERE email = ?', [req.body.req_food_email], async (error, results) => {
        if(error) {
            console.log(error);            
        }
        
        // Validation
        if( results.length === 0) {
            console.log("Email entered must be wrong \nelse\nYour email is not yet registered, Please register yourself first")            
            return res.render('sign-up', {err_email: null, email_not_reg_msg: null})            
        }else{
            const result = Object.values(JSON.parse(JSON.stringify(results)));

            // form filled by user who has registered to website
            if(req.body.req_food_email === result[0].email){

                db.query('INSERT INTO requested_list SET ?', {id:result[0].id, email:result[0].email, name:result[0].name,
                    request_person_name:req.body.req_food_name, phone_no:req.body.phone_no, 
                    alternate_phone_no:req.body.alternate_phone_no,
                    quantity:req.body.quantity, date_of_meal:req.body.date_of_meal,
                    street_address:req.body.street_address, pin_zip_code:req.body.zip_code, district_city:req.body.district_city, 
                    state_province:req.body.state_province, remarks:req.body.remarks}, (error, success) => {
                        
                    if(error) {
                        console.log(error);
                    } 

                    if(success) {
                        console.log(success)
                        
                        msg.text = JSON.parse(JSON.stringify(userdata))
                        console.log(msg)

                        sgMail.send(msg)
                        .then(() => {
                            console.log('Email sent after submitting donate us form successfully')
                        })
                        .catch((error) => {
                            console.error(error)
                        })     
                        return res.redirect('myprofile'); 
                    }else{
                        console.log("Some error in sql statements")
                    }
                })
            }            
        }                                     
    });
}

















// Contact us form 
exports.contactUs = (req, res) => {
    console.log(req.body)
    const userdata = {...req.body};

    const msg = {
        to: [process.env.ADMIN_EMAIL1, process.env.ADMIN_EMAIL2], // Change to your recipient
        from: process.env.SEND_MAIL_FROM, // Change to your verified sender
        subject: 'Todays responses from Contact Us form',
        text: userdata
    }

    // Querying to check that the contact us form was submit by registered or non-registered user
    db.query('SELECT id FROM users WHERE email = ?', [req.body.contact_person_email], async (error, results) => {
        if(error){
            console.log(error);
        }

        const result = Object.values(JSON.parse(JSON.stringify(results)));
        console.log(result)
        if( results.length === 0) {
            console.log("For Contact us form, the email you entered is not yet registered")
            db.query('INSERT INTO contact SET ?', {name:req.body.contact_person_name, email:req.body.contact_person_email, 
            subject:req.body.contact_person_subject, message:req.body.contact_person_message, registered:'no'}, (error, success) => {
                    
                if(error) {
                    console.log(error);
                } 

                if(success) {
                    console.log(success)   
                    console.log("Your request to reach out was successful, do register for future updates")    

                    userdata['registered'] = 'no';
                    console.log(msg)

                    msg.text = JSON.stringify(userdata)
                    // msg.html = JSON.stringify(msg)
                    console.log(msg)

                    // send an email to admin
                    sgMail.send(msg)
                    .then(() => {
                        console.log('Email sent after submitting contact us form by unregistered user')
                    })
                    .catch((error) => {
                        console.error(error)
                    }) 
                    try {
                        const token = req.cookies.jwt;
                        if(token){
                            console.log(`the cookie found is ${token.token}`);
                            res.render('myprofile')   
                        }else{
                            console.log("no cookie found - plz login to access")
                            res.render('sign-up', {err_email: null, email_not_reg_msg: null})
                        }                        
                    } catch (error) {
                        console.log("Error while verifying cookie")
                        res.render('sign-up', {err_email: null, email_not_reg_msg: null})
                    }    
                    
                }
            })           
        }else{
            console.log("For Contact us form, email is already registered to website")
            db.query('INSERT INTO contact SET ?', {id:result[0].id, name:req.body.contact_person_name, email:req.body.contact_person_email, 
                subject:req.body.contact_person_subject, message:req.body.contact_person_message, registered:'yes'}, (error, success) => {
                    
                if(error) {
                    console.log(error);
                } 

                if(success) {
                    console.log(success)              
                    console.log("Your request to reach out was successful...")
                    userdata['registered'] = 'yes';

                    msg.text = JSON.stringify(userdata)
                    // msg.html = JSON.stringify(userdata)
                    console.log(msg)

                    // send an email to admin
                    sgMail.send(msg)
                    .then(() => {
                        console.log('Email sent after submitting contact us form by registered user')
                    })
                    .catch((error) => {
                        console.error(error)
                    })     
                    return res.redirect('myprofile');     
                }
            }) 
        }
    })

}