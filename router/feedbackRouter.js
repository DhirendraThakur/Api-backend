const express = require ("express");
const Feedback = require("../models/feedbackModel");
const router = new express.Router();

router.post("/feedback/add" ,function(req, res){

    const feedbackername = req.body.feedbackername;
    const feedbackdetail = req.body.feedbackdetail;


    const feedbackData = new Feedback ({
        feedbackdetail : feedbackdetail,
        feedbackername : feedbackername,

    });

    feedbackData.save()
    .then(function(){
        res.json({message:'Thank You For Your Feedback', success: true});
    })
    .catch(function(e){
        res.json({message:"somethings went wrong!"})
    });
})

module.exports= router;
