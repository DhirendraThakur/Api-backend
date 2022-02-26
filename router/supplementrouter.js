const express = require("express");
const router = new express.Router();
const Supplement = require("../models/supplementmodel");
const auth = require("../auth/auth");
const upload = require("../upload/image");

// To insert Supplement
router.post(
  "/supplement/add",
  auth.verifyCustomer,
  upload.single("supplement_image"),
  function (req, res) {
    const supplementname = req.body.supplementname;
    const supplementtype = req.body.supplementtype;
    const supplementrate = req.body.supplementrate;
    const supimage = null;

    const userid = req.customerInfo_id;

    const supdata = new Supplement({
      supplementname: supplementname,
      supplementtype: supplementtype,
      supplementrate: supplementrate,
      supimage: supimage,
      userid: userid,
    });
    supdata
      .save()

      .then(function () {
        res.json({
          message: "Supplement has been added successfully",
          success: true,
        });
      })
      .catch(function () {
        res.json({ message: "Somethings went wrong" }).status(400);
      });
  }
);
// to update supplement
router.put("/supplement/update", auth.verifyCustomer, function (req, res) {
  const sid = req.body.sid;
  const supplementname = req.body.supplementname;
  const supplementtype = req.body.supplementtype;
  const supplementrate = req.body.supplementrate;
  console.log(sid, supplementname, supplementtype, supplementrate);

  Supplement.updateOne(
    { _id: sid },
    {
      supplementname: supplementname,
      supplementtype: supplementtype,
      supplementrate: supplementrate,
      supimage: null,
    }
  )
    .then(function () {
      console.log("reached 2");
      res.json({ message: "Supplement has been updated" });
    })
    .catch(function () {
      res.json({ message: "Somethings went Wrong" }).status(400);
    });
});

//to delete supplement
router.delete(
  "/supplement/delete/:id",
  auth.verifyCustomer,
  function (req, res) {
    const sid = req.params.id;
    Supplement.deleteOne({ _id: sid })
      .then(function () {
        res.json({ message: "You have just delete supplement" });
      })
      .catch(function () {
        res.json({ message: "Somethings went wrong" });
      });
  }
);

router.get("/supplement/all", auth.verifyCustomer, function (req, res) {
  Supplement.find({})
    .then(function (data) {
      res.json({
        success: true,
        data: data,
      });
    })
    .catch(function () {
      res.json({ message: "Somethings went wrong" }).status(400);
    });
});

router.get(
  "/supplement/single",
  auth.verifyCustomer,
  function (req, res) {
    const userid = req.customerInfo_id;
    Supplement.find({ userid: userid })
      .then(function (result) {
        res.json(result);
      })
      .catch(function () {
        res.json({ message: "something went wrong" });
      });
  },

  // showing supplent 1 at a time
  router.get("/supplement/one/:sid", auth.verifyCustomer, function (req, res) {
    const sid = req.params.sid;
    Supplement.findOne({ _id: sid })

      .then(function (result) {
        res.json(result);
      })
      .catch(function () {
        res.json({ message: "Somethings went wrong" });
      });
  })
),
  (module.exports = router);
