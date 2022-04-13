const express = require("express");
const { body } = require("express-validator");

const User = require("../models/user");
const Account = require("../models/account");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/signup-superuser",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another email."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    body("firstName", "First Name cannot be empty").trim().not().isEmpty(),
    body("lastName", "Last Name cannot be empty").trim().not().isEmpty(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.signupSuperUser
);

router.post(
  "/signup-user",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another email."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    body("firstName", "First Name cannot be empty").trim().not().isEmpty(),
    body("lastName", "Last Name cannot be empty").trim().not().isEmpty(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.signupUser
);

router.post(
  "/signup-employee",
  auth.verifyCompany,
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another email."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    body("phoneNumber", "Enter a valid 10 digit phone number")
      .trim()
      .isLength({ min: 10, max: 12 }),

    body("firstName", "First Name cannot be empty").trim().not().isEmpty(),
    body("gender", "Gender cannot be empty").trim().not().isEmpty(),
    body("lastName", "Last Name cannot be empty").trim().not().isEmpty(),
  ],
  authController.signupEmployee
);

router.get("/verify/:token", authController.verifyAccount);

router.post("/reset-password", authController.resetPassword);

router.post(
  "/new-password",
  [
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),
  ],
  authController.newPassword
);

router.post("/login", authController.login);
router.post("/login-admin", authController.loginSuperUser);

router.post(
  "/signup-company",
  [
    body("email", "Please enter a valid email to continue.")
      .isEmail()
      .custom((value, { req }) => {
        return Account.findOne({ email: value }).then((accountDoc) => {
          if (accountDoc) {
            return Promise.reject(
              "Email address already exists, please try again with another business email."
            );
          }
        });
      })
      .normalizeEmail(),
    body("password", "Password should be at least 6 characters long")
      .trim()
      .isLength({ min: 6 }),
    body("name", "Company Name cannot be empty").trim().not().isEmpty(),
    // body("payment", "Payment cannot be empty").trim().not().isEmpty(),

    body("motto", "Tags cannot be empty").trim().not().isEmpty(),

    // body("street", "Street cannot be empty").trim().not().isEmpty(),
    // body("locality", "Locality cannot be empty").trim().not().isEmpty(),
    // body("aptName", "Apartment name cannot be empty").trim().not().isEmpty(),
    // body("zip", "Zipcode cannot be empty").trim().not().isEmpty(),

    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match!");
        }
        return true;
      }),

    // body("phoneNo", "Enter a valid 10 digit phone number")
    //   .trim()
    //   .isLength({ min: 10, max: 12 }),
  ],
  authController.signupCompany
);

router.post("/images-test", authController.imagesTest);

module.exports = router;
