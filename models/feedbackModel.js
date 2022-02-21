const mongoose = require("mongoose");
const Feedback = new mongoose.Schema({
feedbackername :{type : String, 
    required: true
  },
    
feedbackdetail :  {type : String, 
      required: true
    },
   
})
module.exports= mongoose.model('Feedback' , Feedback);