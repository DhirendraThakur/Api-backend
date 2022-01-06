// Guard for customer
const jwt = require('jsonwebtoken');
const customer = require('../models/customerModel');
module.exports.verifyCustomer = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const cData = jwt.verify(token,"anysecretkey");
        customer.findOne({_id : cData.custid})
        .then((customerData)=>{
          req.customerInfo=customerData;
          next();   
        })
        .catch((e)=>{
            res.json({error:e});
    }
    )}
   catch (e){
     res.json({error:e});
   }
   

    
}
