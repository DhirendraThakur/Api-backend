const monogoose = require("mongoose");
const Product = monogoose.model("Product",{
    productname: {type : String},
    producttype: { type: String},
})