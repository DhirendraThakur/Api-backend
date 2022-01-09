const express = require ("express");
const Product = require("../models/productModel");
const upload = require("../upload/image");

//const auth = require("../auth/auth");
const auth = require("../auth/auth")
const router = new express.Router();


router.post("/product/add", auth.verifyCustomer, function(req,res){

    //console.log(req.body)

    const productname = req.body.productname;
    const producttype = req.body.producttype;
    const pimage = req.body.pimage;
    const userid = req.customerInfo_id;

    const data = new Product({
        productname:productname,
        producttype : producttype,
        //pimage: pimage,
        userid:userid,
    })

    data.save()
    .then(function(){
        res.send({message:'success'});
    })
    .catch(function(e){
        res.send(e)
    });
    

})

// to update product

router.put('/product/update', auth.verifyCustomer, function(req,res){
    const pid = req.body.pid;
    const productname = req.body.productname;
    const producttype = req.body.producttype;
    Product.updateOne({_id : pid},{productname:productname, producttype: producttype})
    .then(function(){
        res.json({message:"product updated"})
    })
    .catch(function(){
        res.json({message: "Somethings went worng!"})
    })
})
// to delete poduct
router.delete('product/delete', auth.verifyCustomer, function(req,res){
    const pid = req.body.pid;
    Product.deleteOne({_id:pid})
    .then(function(){
        res.json({message: "Deleted"})
    })
    .then(function(){
        res.json({message: "Somethings went wrong"})
    })
})

// to view all products
router.get('/product/all',function(req,res){
    Product.find()
    .then(function(){
        res.json(result)
    })
    .catch(function(){
        res.json({message: "something went wrong"})
    })
})
 // to view product of logged in user
 router.get('product/logged', auth.verifyCustomer, function(req,res){
    const userid = req.customerInfo._id
    Product.find()
     .then(function(){
        res.json(result)
    })
    .catch(function(){
        res.json({message: "something went wrong"})
    })
 })
module.exports= router;
