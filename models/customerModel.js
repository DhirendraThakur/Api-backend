const monogoose = require("mongoose");
const Customer = monogoose.model("Customer",{
    username: {type : String},
    password: { type: String},
    address : {type: String},
    Phone: {type: String},
    uimage: {type:String}
})

module.exports= Customer;