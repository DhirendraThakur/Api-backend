//const { Router } = require("express");
const express = require ("express");
const Supplement = require("../models/supplementmodel");
const router = new express.Router();

router.post("/supplement/add",function(req,res){
    const supplementname = req.body.supplementname;
    const supplementtype = req.body.supplementtype;
    const supplementrate = req.body.supplementrate;

    const supdata = new Supplement({
        supplementname : supplementname,
        supplementtype : supplementtype,
        supplementrate : supplementrate
    })
    supdata.save()
    
    .then(function(){
        res.send({message:'Supplement has been added successfully'});
    }) 
    .catch(function(){
        res.send(e)
    })

})
module.exports = router