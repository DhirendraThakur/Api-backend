const mongoose = require('mongoose');
const Workout = new mongoose.Schema({

    workname : {type: String, required: true},
    worktype : {type: String},
    workdesc : {type: String},
    workimage: {type: String},

    userid :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
      }
    
})
module.exports = mongoose.model('Workout' , Workout);