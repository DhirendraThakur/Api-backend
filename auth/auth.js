// Guard for customer
const jwt = require("jsonwebtoken");
const customer = require("../models/customerModel");
module.exports.verifyCustomer = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const cData = jwt.verify(token, "anysecretkey");

    customer.findById(cData.custId, (err, customerData) => {
      if (err) {
        print(err);
        res.json({ error: e });
        return;
      }
      req.customerInfo = customerData;
      uid = cData.custId;
      next();
    });
  } catch (e) {
    res.json({ error: e });
  }
};
