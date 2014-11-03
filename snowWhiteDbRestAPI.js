// snowWhiteDbRestAPI.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 2200; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// <-- route middleware and first route are here
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});
// more routes for our API will happen here


//#################################################Setting##############################################
var Setting = require('./app/models/setting');
//--------------------------on routes that end in /settings---------------------------------------------
router.route('/settings')
// create a setting (accessed at POST http://localhost:2200/api/settings)
	.post(function (req, res) {

	    var setting = new Setting(); 		// create a new instance of the Setting model
	    setting.uploadPath = req.body.uploadPath;  // set the settings uploadPath (comes from the request)
	    setting.uploadTmpPath = req.body.uploadTmpPath;  // set the settings uploadTmpPath (comes from the request)
	    setting.maxPostSize = req.body.maxPostSize;  // set the settings maxPostSize (comes from the request)
	    setting.maxFileSize = req.body.maxFileSize;  // set the settings maxFileSize (comes from the request)
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            // save the setting and check for errors
	            setting.save(function (err) {
	                if (err)
	                    res.send(err);

	                res.json({ message: 'Setting Successfully created!' });
	                mongoose.disconnect();
	            });
	        }
	    });
	    

	})
// get all the settings (accessed at GET http://localhost:2200/api/settings)
	.get(function (req, res) {
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            Setting.find(function (err, settings) {
	                if (err)
	                    res.send(err);

	                res.json(settings);
	                mongoose.disconnect();
	            });
	        }
	    });
	});
//--------------------------on routes that end in /settings/:setting_id---------------------------------
router.route('/settings/:setting_id')
// get the setting with that id (accessed at GET http://localhost:2200/api/settings/:setting_id)
	.get(function (req, res) {
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            Setting.findById(req.params.setting_id, function (err, setting) {
	                if (err)
	                    res.send(err);
	                res.json(setting);
	                mongoose.disconnect();
	            });
	        }
	    });
	})
// update the setting with this id (accessed at PUT http://localhost:2200/api/settings/:setting_id)
    .put(function (req, res) {
        mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
            if (err) {
                console.error('\x1b[31m', 'Could not connect to MongoDB!');
                console.log(err);
            } else {
                // use our setting model to find the setting we want
                Setting.findById(req.params.setting_id, function (err, setting) {

                    if (err)
                        res.send(err);
                    if (setting !== null) {
                        setting.uploadPath = req.body.uploadPath;  // set the settings uploadPath (comes from the request)
                        setting.uploadTmpPath = req.body.uploadTmpPath;  // set the settings uploadTmpPath (comes from the request)
                        setting.maxPostSize = req.body.maxPostSize;  // set the settings maxPostSize (comes from the request)
                        setting.maxFileSize = req.body.maxFileSize;  // set the settings maxFileSize (comes from the request)

                        // save the setting
                        setting.save(function (err) {
                            if (err)
                                res.send(err);

                            res.json({ message: 'Setting Successfully updated!' });
                            mongoose.disconnect();
                        });
                    }
                    else {
                        res.json({ message: 'Setting not found!' });
                        mongoose.disconnect();
                    }
                }); 
            }
        });
    })
// delete the setting with this id (accessed at DELETE http://localhost:2200/api/settings/:setting_id)
	.delete(function (req, res) {
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            Setting.remove({
	                _id: req.params.setting_id
	            }, function (err, setting) {
	                if (err)
	                    res.send(err);
	                if (setting == 1) {
	                    res.json({ message: 'Setting Successfully deleted' });
	                    mongoose.disconnect();
	                } else {
	                    res.json({ message: 'Setting not found!' });
	                    mongoose.disconnect();
	                }
	            });
	            
	        }
	    });
	});
//######################################################################################################


//####################################################User##############################################
var User = require('./app/models/user');
//--------------------------on routes that end in /users------------------------------------------------
router.route('/users')
// create a user (accessed at POST http://localhost:2200/api/users)
	.post(function (req, res) {

	    var user = new User(); 		// create a new instance of the User model
	    user.uploadPath = req.body.uploadPath;  // set the users uploadPath (comes from the request)
	    user.uploadTmpPath = req.body.uploadTmpPath;  // set the users uploadTmpPath (comes from the request)
	    user.maxPostSize = req.body.maxPostSize;  // set the users maxPostSize (comes from the request)
	    user.maxFileSize = req.body.maxFileSize;  // set the users maxFileSize (comes from the request)
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            // save the user and check for errors
	            user.save(function (err) {
	                if (err)
	                    res.send(err);

	                res.json({ message: 'User Successfully created!' });
	                mongoose.disconnect();
	            });
	        }
	    });


	})
// get all the users (accessed at GET http://localhost:2200/api/users)
	.get(function (req, res) {
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            User.find(function (err, users) {
	                if (err)
	                    res.send(err);

	                res.json(users);
	                mongoose.disconnect();
	            });
	        }
	    });
	});
//--------------------------on routes that end in /users/:user_id---------------------------------------
router.route('/users/:user_id')
// get the user with that id (accessed at GET http://localhost:2200/api/users/:user_id)
	.get(function (req, res) {
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            User.findById(req.params.user_id, function (err, user) {
	                if (err)
	                    res.send(err);
	                res.json(user);
	                mongoose.disconnect();
	            });
	        }
	    });
	})
// update the user with this id (accessed at PUT http://localhost:2200/api/users/:user_id)
    .put(function (req, res) {
        mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
            if (err) {
                console.error('\x1b[31m', 'Could not connect to MongoDB!');
                console.log(err);
            } else {
                // use our user model to find the user we want
                User.findById(req.params.user_id, function (err, user) {

                    if (err)
                        res.send(err);
                    if (user !== null) {
                        user.uploadPath = req.body.uploadPath;  // set the users uploadPath (comes from the request)
                        user.uploadTmpPath = req.body.uploadTmpPath;  // set the users uploadTmpPath (comes from the request)
                        user.maxPostSize = req.body.maxPostSize;  // set the users maxPostSize (comes from the request)
                        user.maxFileSize = req.body.maxFileSize;  // set the users maxFileSize (comes from the request)

                        // save the user
                        user.save(function (err) {
                            if (err)
                                res.send(err);

                            res.json({ message: 'User Successfully updated!' });
                            mongoose.disconnect();
                        });
                    }
                    else {
                        res.json({ message: 'User not found!' });
                        mongoose.disconnect();
                    }
                });
            }
        });
    })
// delete the user with this id (accessed at DELETE http://localhost:2200/api/users/:user_id)
	.delete(function (req, res) {
	    mongoose.connect('mongodb://localhost:27017/snow_white', function (err) { // connect to our database
	        if (err) {
	            console.error('\x1b[31m', 'Could not connect to MongoDB!');
	            console.log(err);
	        } else {
	            User.remove({
	                _id: req.params.user_id
	            }, function (err, user) {
	                if (err)
	                    res.send(err);
	                if (user == 1) {
	                    res.json({ message: 'User Successfully deleted' });
	                    mongoose.disconnect();
	                } else {
	                    res.json({ message: 'User not found!' });
	                    mongoose.disconnect();
	                }
	            });

	        }
	    });
	});
//######################################################################################################

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/db', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Database REST API Server is running on port ' + port);