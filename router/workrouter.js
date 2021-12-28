const express = require ("express");
const Work = require("../models/workmodel");
const jwt = require ("jsonwebtoken");

const router = new express.Router();

router.post("/workout/add", function(req,res){

    console.log(req.body)
    const workname= req.body.workname;
    const worktype = req.body.worktype;
    const data = new Work({
        workname:workname,
        worktype:worktype
    }) 
    data.save()
    .then(function(){
        res.json({message:"Successfuly add"});
    })
    .catch(function(e){
        res.json(e)
    })
})
module.exports = router;
