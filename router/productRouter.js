const express = require("express");
const Product = require("../models/productModel");
const auth = require("../auth/auth");
const router = new express.Router();
const upload = require("../upload/image");

router.post(
  "/product/add",
  auth.verifyCustomer,
  upload.single("product_image"),
  function (req, res) {
    const productname = req.body.productname;
    const producttype = req.body.producttype;
    const productprice = req.body.productprice;
    const pimage = req.file.filename;
    const userid = req.customerInfo_id;

    const data = new Product({
      productname: productname,
      producttype: producttype,
      productprice: productprice,
      pimage: pimage,
      userid: userid,
    });
    data
      .save()
      .then(function () {
        res.json({ message: "Product Inserted", success: true });
      })
      .catch(function (e) {
        res.json({ message: "somethings went wrong!" });
      });
  }
);

// to update product

router.put("/product/update", auth.verifyCustomer, function (req, res) {
  const pid = req.body.pid;
  const productname = req.body.productname;
  const producttype = req.body.producttype;
  const productprice = req.body.productprice;
  Product.updateOne(
    { _id: pid },
    {
      productname: productname,
      producttype: producttype,
      productprice: productprice,
    }
  )
    .then(function () {
      res.json({ message: "product updated" });
    })
    .catch(function () {
      res.json({ message: "Somethings went worng!" });
    });
});
// TODO - need to fix
// to delete poduct
// router.delete('product/delete/'+pid, auth.verifyCustomer, function(req,res){
//     const pid = req.params.pid;
//     Product.deleteOne({_id : pid, userid : userid})
//     .then(function(){
//         res.json({message: "Deleted"})
//     })
//     .then(function(){
//         res.json({message: "Somethings went wrong"})
//     })
// })

// to view all products
router.get("/product/all", auth.verifyCustomer, function (req, res) {
  Product.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: "Something went wrong" });
    });
});
// to view product of logged in user
router.get("/product/logged", auth.verifyCustomer, function (req, res) {
  const userid = req.customerInfo_id;
  Product.find({ userid: userid })
    .then(function (result) {
      res.json(result);
    })
    .catch(function () {
      res.json({ message: "something went wrong" });
    });
});

// showing supplent 1 at a time
router.get("/product/one/:pid", auth.verifyCustomer, function (req, res) {
  const pid = req.params.pid;
  Product.findOne({ _id: pid })

    .then(function (result) {
      res.json(result);
    })
    .catch(function () {
      res.json({ message: "Somethings went wrong" });
    });
});

module.exports = router;
