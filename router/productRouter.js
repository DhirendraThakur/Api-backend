const express = require("express");
const Product = require("../models/productModel");
const auth = require("../auth/auth");
const router = new express.Router();
const upload = require("../upload/image");

router.post("/product/add", auth.verifyCustomer, function (req, res) {
  const productname = req.body.productname;
  const producttype = req.body.producttype;
  const productprice = req.body.productprice;
  const userid = req.customerInfo._id;
  const pimage = null;

  const data = new Product({
    productname: productname,
    producttype: producttype,
    productprice: productprice,
    pimage: pimage,
    userid: userid,
  });
  data
    .save()
    .then(function (ele) {
      delete ele.__v;
      res.json({ message: "Product Inserted", success: true, data: ele });
    })
    .catch(function (e) {
      console.log(e);
      res.json({ message: "somethings went wrong!" });
    });
});

// to upload image
router.put("/product/:product_id/upload", auth.verifyCustomer, (req, res) => {
  product_id = req.params.product_id;
  filename = req.file.originalname;
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, "./uploads/" + filename);

  file_ext = path.extname(filename).toLowerCase();

  if (file_ext === ".png" || file_ext === ".jpg" || file_ext === ".jpeg") {
    fs.rename(tempPath, targetPath, (err) => {
      if (err) return handleError(err, res);
      Product.updateOne(
        { _id: pid },
        {
          pimage: targetPath,
        }
      );
      res.status(200).contentType("text/plain").end("File uploaded!");
    });
  } else {
    fs.unlink(tempPath, (err) => {
      if (err) return handleError(err, res);
      res
        .status(403)
        .contentType("text/plain")
        .end("Only .png/.jpg/.jpeg files are allowed!");
    });
  }
});

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

// to delete poduct
router.delete("/product/delete/:pid", auth.verifyCustomer, function (req, res) {
  const pid = req.params.pid;
  console.log(pid);
  try {
    Product.deleteOne({ _id: pid })
      .then(function () {
        res.json({ message: "Deleted" });
      })
      .catch(function () {
        res.json({ message: "Somethings went wrong" }).status(400);
      });
  } catch (err) {
    console.log(err);
    res.json({ message: "Somethings went wrong" }).status(500);
  }
});

// to view all products
router.get("/product/all", auth.verifyCustomer, function (req, res) {
  Product.find({})
    .then((data) => {
      res.json({
        success: true,
        data: data,
      });
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
  try {
    Product.findOne({ _id: pid })

      .then(function (result) {
        res.json(result);
      })
      .catch(function () {
        res.json({ message: "Somethings went wrong" }).status(400);
      });
  } catch (err) {
    console.log(err);
    res.json({ message: "Somethings went wrong" }).status(500);
  }
});

module.exports = router;
