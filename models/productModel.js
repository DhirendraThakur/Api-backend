const mongoose = require("mongoose");
const Product = new mongoose.Schema({
    productname: {type : String, 
      required: true
    },

    producttype: { 
      type : String
    },

  pimage: {
    type: String
  },
  

  productprice:{
    type: String,
  },
  userid :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  }
  
})
module.exports= mongoose.model('Product' , Product);