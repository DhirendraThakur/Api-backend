//const { Router } = require("express");
const express = require ("express");
const Supplement = require("../models/supplementmodel");
const auth = require("../auth/auth");

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
// to update supplement
router.put('/supplement/update', auth.verifyCustomer, function(req,res){
    const sid = req.body.sid;
    const supplementname = req.body.supplementname;
    const supplementtype = req.body.supplementtype;
    const supplementrate = req.body.supplementrate;
   Supplement.updateOne({_id : sid},{supplementname:supplementname, supplementtype: supplementtype, supplementrate: supplementrate})
    .then(function(){
        res.json({message:'Supplement has been updated'})
    })
    .catch(function(){
        res.json({message: 'Somethings went Wrong'})
    })

})

//to delete supplement
router.delete('/supplement/delete', auth.verifyCustomer, function(req,res){
    const sid = req.body.sid;
Supplement.deleteOne({_id : sid})
.then (function(){
    res.json({message:"You have just delete supplement"})
})
.catch(function(){
    res.json({message: 'Somethings went wrong'})
})
})

module.exports = router