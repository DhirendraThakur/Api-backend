
const express = require ("express");
const bcryptjs = require("bcryptjs");
const jwt = require ("jsonwebtoken");
const Customer = require("../models/customerModel");
const upload = require("../upload/image");
const auth = require("../auth/auth");
const { appendFile } = require("fs");


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
//const uimage = req.body.phone

bcryptjs.hash(password,10, function(e, hashed_value){
    const data = new Customer({
        username : username,
        password : hashed_value,
        address : address,
        phone : phone,
       // uimage: req.file.filename,
    })
data.save()
.then (function(){
    res.json({message : "Success"});
})
.catch (function(e){
    res.json(e);
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
    /// Updateing user profile/////
})
router.put("/customer/profile/update", auth.verifyCustomer, function(req,res){
const cid = req.customerInfo._id;
const username= req.body.username;
const password = req.body.password;
const address = req.body.address;
const phone = req.body.phone;


Customer.updateOne({_id:cid},{username:username,phone:phone, address:address, password:password}).then(function(){
    res.json({msg: "profile updated"})
}).catch(function(){

    res.json({msg: "Something went wrong. Please try again"})
});

})

//to delete customer by itself
router.delete("/customer/profile/delete",auth.verifyCustomer, function(req,res){
    const cid = req.customerInfo._id;
    Customer.findByIdAndDelete(cid)
    .then(function(){
        res.json({msg: "Customer deleted"});
    })
    .catch(function(){
        res.json({msg: "Somethings went wrong!"})
    })


}) 

// To delete customer by admin
/*
router.delete("/Customer/profile/admin/delete", auth.verifyAdmin, function(){

    const cid = req.body.id;
    Customer.deleteOne({_id:cid})
    .then()
    .catch()
}) */

router.post("/product/upload", upload.single('myimage'), function(req,res){
    console.log(req.file)
    
    if(req.file==undefined){
        return res.json({msg :"Invalid"})
    }
    const imagedata = new Customer({
        uimage : req.file.filename
    })
    imagedata.save();
})


// preview profile of logginuser
router.get('/profile/view', auth.verifyCustomer, function(req,res){
    const userid = req.customerInfo._id;
    Customer.find({userid:userid})
    .then(function(data){
        res.json(data)
    })
    .catch(function(){
        res.json({message: "somethings went wrong"})
    })
})

// display loged user at a time
router.get('/profile/one', auth.verifyCustomer, function(req, res){
    const userid = req.customerInfo_id
    Customer.findOne({userid:userid})
    .then(function(){
        res.json(result)
    })
    .catch(function(){
        res.json({message: "something went wrong"})
    })
})
module.exports= router;