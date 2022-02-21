const mongoose = require("mongoose");
const supplement =  new mongoose.Schema({
    supplementname : {type:String, required: true},
    supplementtype: {type: String},
    supplementrate: {type: String},
    supimage : {type: String},
    userid :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
      }
})
module.exports = mongoose.model('supplement' , supplement);
