const express = require ("express");
const Product = require("../models/productModel");
//const upload = require("../upload/image");

//const auth = require("../auth/auth");
const router = new express.Router();


router.post("/product/add", function(req,res){

    //console.log(req.body)
    const productname = req.body.productname;
    const producttype = req.body.producttype;
    //const pimage = req.body.pimage,
    const prodata = new Product({
        productname:productname,
        producttype : producttype
    })

    
   
    prodata.save()
    .then(function(){
        res.send({message:'success'});
    })
    .catch(function(e){
        res.send(e)
    });
    

})
module.exports= router;
