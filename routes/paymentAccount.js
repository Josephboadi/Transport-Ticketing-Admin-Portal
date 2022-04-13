const express = require("express");
const { body } = require("express-validator");

const paymentAccountController = require("../controllers/paymentAccountController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-paymentAccount",
  auth.verifyCompany,
  [
    body("accountName", "Account Name cannot be empty").trim().not().isEmpty(),
    body("financialServiceName", "Financial service Name cannot be empty")
      .trim()
      .not()
      .isEmpty(),
    body("accountNumber", "Account Number cannot be empty")
      .trim()
      .not()
      .isEmpty(),
  ],
  paymentAccountController.createPaymentAccount
);

router.delete(
  "/delete-paymentAccount/:paymentAccountId",
  auth.verifyCompany,
  paymentAccountController.deletePaymentAccount
);

router.put(
  "/edit-paymentAccount/:paymentAccountId",
  auth.verifyCompany,
  [
    body("accountName", "Account Name cannot be empty").trim().not().isEmpty(),
    body("financialServiceName", "Financial service Name cannot be empty")
      .trim()
      .not()
      .isEmpty(),
    body("accountNumber", "Account Number cannot be empty")
      .trim()
      .not()
      .isEmpty(),
  ],
  paymentAccountController.editPaymentAccount
);

router.put(
  "/edit-payAccount/:payAccountId",
  auth.verifyCompany,
  [
    body("privateId", "Private Id cannot be empty").trim().not().isEmpty(),
    body("publicId", "Public Id cannot be empty").trim().not().isEmpty(),
  ],
  paymentAccountController.editPayAccount
);

router.get(
  "/get-paymentAccounts",
  auth.verifyCompany,
  paymentAccountController.getPaymentAccounts
);

router.get(
  "/get-paymentAccount/:paymentAccountId",
  auth.verifyCompany,
  paymentAccountController.getPaymentAccount
);

module.exports = router;
