
const express = require ("express");
const bcryptjs = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const Customer = require("../models/customerModel");

const router = new express.Router();


router.post("/customer/register", function(req,res){
console.log(req.body)
    const username =req.body.username;
    Customer.findOne({username: username})
    .then(function(customerData){
if (customerData!=null){
    res.json({message: "User Already Exits"});
    return;
}   
const password = req.body.password;
const address = req.body.address;
const phone = req.body.phone;

bcryptjs.hash(password,10, function(e, hashed_value){
    const data = new Customer({
        username : username,
        password : hashed_value,
        address : address,
        phone : phone
    })
data.save()
.then (function(){
    res.json({message : "Success"});
})
.catch (function(e){
    res.json(e)
})
})

})

})

// login route for customer
router.post("/customer/login", function(req,res){
    const username = req.body.username;
    Customer.findOne({username:username})
    .then (function(customerData){
      //  console.log(customerData);
      if(customerData==null){
        return res.json({message: "Invalid user!", })
      }
      // here the code foes for comparing pw

      const password = req.body.password
    bcryptjs.compare(password, customerData.password, function(e,result){
        //console.log(result);
        if (result==false){
            return res.json({message:"invalid password"})

        }
        //
        const token = jwt.sign({custId: customerData._id}, "anysecretkey");
    res.json({token : token, message :"success"});

    } )
    })
    // comparing password between tha password provided by client and password in db
    

})
module.exports= router;