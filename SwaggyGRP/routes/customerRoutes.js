const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const Restaurant = require('../models/restaurant');

router.post('/register',function(req,res) {
    const customer = new Customer();

    let nameRegex = /^[a-z ,.'-]{1,25}$/i;
    let customerEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let phoneNumberRegex = /^[0-9]{10}$/;
    let addressRegex = /^[a-z 0-9,.'-]{20,300}$/i;

    customer.customerId = req.body.customerId;
    customer.firstName = req.body.firstName;

    if(!customer.firstName.match(nameRegex)) {
        if(customer.firstName.length > 25) throw "First name can't be more than 25 characters.";
        else throw "First name invalid, special characters cannot be used.";
    }

    customer.lastName = req.body.lastName;
    if(!customer.lastName.match(nameRegex)) {
        if(customer.lastName.length > 25) throw "Last name can't be more than 25 characters.";
        else throw "Last name invalid, special characters cannot be used.";
    }

    customer.customerEmail = req.body.customerEmail;
    if(!customer.customerEmail.match(customerEmailRegex)) throw "Your email is invalid.";

    customer.phoneNumber = req.body.phoneNumber;
    if(!customer.phoneNumber.match(phoneNumberRegex)) throw "Your number is invalid.";

    customer.password = req.body.password;

    customer.confirmPassword = req.body.confirmPassword;

    customer.address = req.body.address;
    if(!customer.address.match(addressRegex)) throw "This is an invalid address.";

    customer.save(function(err) {
        if(err) throw err;
        res.json({"Status" : "Customer Saved"});
    });
});

router.get("/", function(req,res) {
    res.send("In route");
});

//Home Screen for viewing all restaurants

router.get('/home', function(req, res) {
    Restaurant.find({}, function (err, restaurants) {
        if (err) {
            console.log(err)
        } else {
            console.log(restaurants);
            res.json(restaurants);
            res.end();
        }
    })
});

//On selecting restaurant :restaurantId is used to find the required restaurant

router.get('/restaurantDetails/:restaurantId', function(req, res) {
    Restaurant.find({restaurantId : req.params.restaurantId}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
            res.end();
        }
    })

});

// TEST FOR DATA RESTAURANT DATA

router.post('/restaurantDataTest',function(req,res) {
    const restaurant = new Restaurant();

    restaurant.restaurantId = req.body.restaurantId;
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.restaurantEmail = req.body.restaurantEmail;
    restaurant.restaurantPhoneNumber = req.body.restaurantPhoneNumber;
    restaurant.restaurantAddress = req.body.restaurantAddress;
    restaurant.restaurantGeoLocation = req.body.restaurantGeoLocation;

    restaurant.save(function(err) {
        if(err) throw err;
        res.json({"Status" : "Restaurant Saved"});
    });
});

module.exports = router;