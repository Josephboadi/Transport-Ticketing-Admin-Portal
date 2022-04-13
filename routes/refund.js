const express = require("express");
const { body } = require("express-validator");

const refundController = require("../controllers/refundController");
const auth = require("../middleware/auth");

const router = express.Router();

// router.post(
//   "/create-location",
//   auth.verifyCompany,
//   [
//     body("name", "Location name cannot be empty").trim().not().isEmpty(),
//     body("region", "Region cannot be empty").trim().not().isEmpty(),
//   ],
//   locationController.createLocation
// );

// router.delete(
//   "/delete-location/:locationId",
//   auth.verifyCompany,
//   locationController.deleteLocation
// );

router.put(
  "/edit-refund/:refundId/:bookingId",
  auth.verifyCompany,
  [
    body("paymentId", "Refund paymentId cannot be empty")
      .trim()
      .not()
      .isEmpty(),
  ],
  refundController.editRefund
);

router.get("/get-refunds", auth.verifyCompany, refundController.getRefunds);

router.get(
  "/get-refund/:refundId",
  auth.verifyCompany,
  refundController.getRefund
);

module.exports = router;
