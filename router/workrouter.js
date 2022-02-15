const express = require("express");
//const Work = require("../models/workmodel");
//const jwt = require ("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../upload/image");
const Workout  = require("../models/workmodel");

const router = new express.Router();

router.post("/workout/add", auth.verifyCustomer, upload.single('workout_image'), function(req,res){

  // console.log(req.body)
    const workname = req.body.workname;
    const worktype = req.body.worktype;
    const workdesc = req.body.workdesc;
    const workimage = req.file.filename;
    const userid = req.customerInfo._id;
    const data = new Workout({
        workname : workname,
        worktype : worktype,
        workdesc : workdesc,
        workimage : workimage,
        userid : userid
    });
    data.save()
    .then(function(){
        res.json({message: "Successfuly add", success : true});
    })
    .catch(function(e){
        res.json(e)
        console.log(e);
    }); 
})

// to update workout 
router.put('/workout/update', auth.verifyCustomer, function(req,res){
    const workid = req.body.workid;
    const workname = req.body.workname;
    const worktype = req.body.worktype;
    const workdesc = req.body.workdesc;
  //  const userid = req.customerInfo._id;

    Workout.updateOne({_id : workid}, {
        workname : workname,
        worktype: worktype,
        workdesc : workdesc,

    })
    .then(function(){
        res.json({message: "Workout has been updated!!"})
    })
    .catch(function(){
        res.json({message:"Something went worng!"})
    })
})

// to delete workout data
router.delete('/workout/delete/:workid', auth.verifyCustomer, function(req,res){
    const userid = req.customerInfo_id;
    Work.deleteOne({_id: workid, userid: userid})
    .then(function(){
        res.json({message: "Workout has been deleted"})
    })
    .catch(function(){
        res.json({message : "Something went wrong!"})
    })
})

// to view workout from login user
router.get('workout/logged', auth.verifyCustomer, function(req, res){
    const userid = req.customerInfo_id;
    Work.find({userid: userid})
    .then(function(result){
        res.json(result)
    })
    .catch (function(){
        res.json({message: "Somethings went worng!"})
    })
})
module.exports= router;
