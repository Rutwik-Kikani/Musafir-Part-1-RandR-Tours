var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/User');
var Request = require('./models/Request');
var Package = require('./models/Package');
var bodyparser = require('body-parser');
var cors = require("cors");
var nodemailer = require("nodemailer");

var app = express();
var db = mongoose.connect('mongodb://localhost:27017/RR_db', function (err) {
    if (err) {
        console.log("There is error in connecting with mongodb");
    }
    console.log('Connection has been added');
});

app.use(cors());
app.use(bodyparser.json());

app.set('port', process.env.port || 3000);


app.get('/', (req, res) => {
    res.send("this is default page");
});

// for creating a user
app.post('/signup', (req, res) => {
    /*console.log(req.body);*/
    //creating instan of a schema User named as 'user'
    var user = new User();
    user.firstname = req.body.firstname;;
    user.lastname = req.body.lastname;;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;

    //it is save the user to the database
    User.findOne({ email: req.body.email }, function (err, userp) {
        if (err) {
            console.log("there is a error in checking user is pre exist or not " + err);
            res.status(400);
            res.send(err);
        }
        else {

            //if result return by find opration is null then save the 'user' else return messg2 and preexisted user.
            if (userp == null) {
                //it is save the user to the database
                user.save(function (err, user) {
                    if (err) {
                        var emessg = "error in saving user"
                        console.log("there is an err in adding user in database :" + err);
                        res.status(500).json([{ "messg": emessg }, err]);
                    }
                    else {
                        var messg1 = "user is successfully added";
                        console.log('user ' + user.firstname + ' is saved in database');
                        var transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                                user: 'rutvik5101@gmail.com',
                                pass: 'rk5101@gmail'
                            }
                        });
                    
                        var mailOptions = {
                            from: 'rutvik5101@gmail.com',
                            to: req.body.email,
                            subject: 'Confirm email',
                            text: 'Welcome to R&R!'
                        };
                    
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            } else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.json([{ "messg": messg1 }, user])
                        res.status(200);
                    }
                });
            }
            else {
                var messg2 = "User already exists.";
                console.log('user with an email ' + user.email + ' is already in database here is all data');
                console.log(userp);
                res.json([{ "messg": messg2 }]);
            }
        }
    });
});


//------------------for login user---------------------------------------//
app.post('/login', (req, res) => {
    // to see that the req.body is properly comeing or not
    //  console.log(req.body);
    //  console.log(req.body.email) ;

    User.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] }, function (err, userl) {
        if (err) {
            console.log("Unable to find an User");
            res.status(400);
            res.send("Unable to find an User");
        }
        else {
            if (userl == null) {
                console.log(userl);
                console.log("User not found");
                res.json(userl);
            }
            else {
                console.log(userl);
                console.log("User found and return as respones");
                res.json(userl);
            }
        }
    })
});

//-------------------for showing all the users--------------------------//

app.get("/showusers", (req, res) => {
    User.find(function (err, users) {
        if (err) {
            console.log("there is a error in showing all users :" + err);
            res.status(400);
            res.send("Unable to find users");
        }
        else {
            if (users == null) {
                var nmessg = "there is no user in database right now";
                console.log("database is empty")
                res.json({ "messg": nmessg });
            }
            else {
                console.log(users);
                console.log("All users returned");
                res.json(users);
            }
        }
    });
});

//-------------------for showing the user using id --------------------------//
app.get("/showuser/:id", (req, res) => {
    User.findById(req.params.id, function (err, useri) {

        //when the if(err){.....} run 
        /*ans: when the criteria of database is not seticfied such as in database 
        _id should be of 24 char but i insert 23
        then it give error in form of err object.
        and if i insert the 24 char wrong id then it return me the null*/

        if (err) {
            console.log("there is a error in showing user : " + err);
            res.status(400);
            res.send("Unable to find an user with id");
        }
        else {
            if (useri == null) {
                var nmessg = "there is no user found with id :" + req.params.id;
                console.log("there is no user with id :" + req.params.id);
                res.json({ "messg": nmessg });
            }
            else {
                console.log(useri);
                console.log("user record returned");
                res.json(useri);
            }
        }
    });
});

//---------------------------------showing user using an email-----------------------------//
app.get("/showuserbyemail/:email", (req, res) => {
    //for testing to see what is commimg in req params.
    //console.log(req.params.email);
    User.findOne({ email: req.params.email }, function (err, userei) {
        if (err) {
            console.log("there is a error in showing user : " + err);
            res.status(400);
            res.send("Unable to find an user with email " + req.params.email);
        }
        else {
            if (userei == null) {
                var nmessg = "there is no user found with email :" + req.params.email;
                console.log("there is no user with email :" + req.params.eamil);
                res.json({ "messg": nmessg });
            }
            else {
                console.log(userei);
                console.log("User found and return as respones");
                res.json(userei);
            }
        }
    })
});

//--------------------------deleting user with an id----------------------//
app.delete("/delete/:id", (req, res) => {
    //for testing:
    //console.log(req.params.id);

    User.findById(req.params.id, function (err, userd) {
        if (err) {
            console.log("there is a error in finding user for deletion :" + err);
            res.status(400);
            res.send("Unable to find an user to delete");
        }
        else {
            if (userd == null) {
                var nmessg = "user is not exited in database for deletion ";
                console.log('user with an id ' + req.params.id + ' is not exited in database for deletion');
                res.json({ "messg": nmessg });
            }
            else {
                console.log(userd);
                userd.remove(function (err) {
                    if (err) {
                        console.log("there is err in removation of user : " + err);
                        res.status(400);
                        res.send("Unable to remove user may be it is protected");
                    }
                    console.log(" above user removed!");
                    res.json({ "message": "user removed!" });
                });
            }
        }
    });
});

//--------------------------deleting user using an email----------------------//
app.delete("/deletebyemail/:email", (req, res) => {
    //for testing to see what is comming in request paramenter
    //console.log(req.params.id);

    User.findOne({email:req.params.email}, function (err, userde) {
        if (err) {
            console.log("there is a error in finding user for deletion :" + err);
            res.status(400);
            res.send("Unable to find an user to delete");
        }
        else {
            if (userde == null) {
                var nmessg = "user is not exited in database for deletion ";
                console.log('user with an id ' + req.params.email + ' is not exited in database for deletion');
                res.json({ "messg": nmessg });
            }
            else {
                var messg = "user "+userde.firstname+" with email "+userde.email+" is removed!"
                console.log(userde);
                userde.remove(function (err) {
                    if (err) {
                        console.log("there is err in removation of user : " + err);
                        res.status(400);
                        res.send("Unable to remove user may be it is protected");
                    }
                    console.log("above user removed!");
                    res.json({ "messg": messg });
                });
            }
        }
    });
});

//------------------------------------update the user by id------------------------------//
app.put("/update", (req, res) => {
        User.findById(req.body._id, function (err, useru) {
            if (err) {
                console.log("there is a error in finding user for updation: " + err);
                res.status(400);
                res.send("Unable to find an user to update");
            }
            else {
                if (useru == null) {
                    var nmessg = "user is not exited in database for updation ";
                    console.log('user with an id ' + req.params.id + ' is not exited in database');
                    res.json({"messg": nmessg});
                }
                else {
                    if (req.body.firstname) { useru.firstname = req.body.firstname; }
                    if (req.body.lastname) { useru.lastname = req.body.lastname; }
                    if (req.body.email) { useru.email = req.body.email; }
                    if (req.body.password) { useru.password = req.body.password; }
                    if (req.body.phone) { useru.phone = req.body.phone; }
    
                    useru.save(function (err) {
                        if (err) {
                            var emessg = "error in saving user for updation"
                            console.log("there is an err in adding user in database :" + err);
                            res.status(500).json([{ "messg": emessg }, err]);
                        }
                        else {
                            var messg1 = "user is successfully updated";
                            console.log('user with id ' + useru._id + ' is updated in database');
                            res.json([{ "messg": messg1 }, useru])
                            res.status(200);
                        }
                    });
                }
            }
        });
    });

app.post('/request', (req, res) => {
    //creating instan of a schema User named as 'user'
    var request = new Request();
    request.firstname = req.body.firstname;;
    request.lastname = req.body.lastname;;
    request.email = req.body.email;
    request.phone = req.body.phone;

    //it is save the user to the database
    request.save(function (err, request) {
        if (err) {
            var messg = "user already exist"
            console.log("there is an err in adding user in database ");
            res.status(500).json([{ "messg": this.messg }, err]);
        }
        else {
            //var messg = "user is successfully added";
            console.log('user ' + request.firstname + ' request saved in database');
            res.json([{ "messg": "Request received successfully!" }, request])
            res.status(200);
        }
    });
});

// app.post('/package', (req, res) => {
//     Package.findOne({ $and: [{ email: req.body.email }, { password: req.body.password }] }, function (err, user) {
//         if (err) {
//             console.log("Unable to find an employee");
//             res.status(400);
//             res.send(err);
//         }
//         else {
//             if (user == null) {
//                 console.log("User not found");
//                 res.send(user);
//             }
//             else {
//                 console.log("User found");
//                 console.log(user);
//                 res.send(user);
//             }
//         }
//     })
// });

app.listen(app.get('port'), function (err) {
    if (err) {
        console.log('this is a err for listing ' + err);
    }
    console.log("server is ruuning", app.get('port'));
});
