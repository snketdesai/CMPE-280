/**
 * 
 */
//mongodb://<dbuser>:<dbpassword>@ds061701.mongolab.com:61701/cmpe280_user
var mongodb = require('mongodb');
var http = require('http');
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

var uri = 'mongodb://cmpe280:cmpe280@ds061701.mongolab.com:61701/cmpe280_user';


app.use(bodyParser.urlencoded({
	  extended: true
	}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./public'));

	app.post('/', function (req, res) {
	    console.log(JSON.stringify(req.body));
	    
	    mongodb.MongoClient.connect(uri, function (err, db) {
	        if(err) {
	             res.send("Error while connecting to Mongo.");
	        } else {
	            var collection = db.collection('user');
            
                // Submit to the DB
                collection.insert({
                    "fname" : req.body.fname,
                    "lname" : req.body.lname,
                    "email" : req.body.email
                }, function (err, doc) {
                    if (err) {
                        // If it failed, return error
                         console.log(err);
                        res.send("There was a problem adding the information to the database.");
                    }
                    else {
                     console.log("Data saved successfully.");
                        res.status(200).json({msg:"Data saved successfully"});
                    }
                });
	        }
	    });
	});
	
	var ipaddress = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
    var port      = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;


    if (typeof ipaddress === "undefined") {
        //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
        //  allows us to run/test the app locally.
        console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
        ipaddress = "127.0.0.1";
    };
    
	app.listen(port, ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...', Date(Date.now()), ipaddress, port);
    });


