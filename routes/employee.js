const express = require("express");
const { body } = require("express-validator");

const employeeController = require("../controllers/employeeController");
const auth = require("../middleware/auth");

const router = express.Router();

router.delete(
  "/delete-employee/:employeeId",
  auth.verifyCompany,
  employeeController.deleteEmployee
);

router.put(
  "/edit-employee/:employeeId",
  auth.verifyCompany,
  [
    // body("email", "Please enter a valid email to continue.")
    //   .isEmail()
    //   .custom((value, { req }) => {
    //     return Account.findOne({ email: value }).then((accountDoc) => {
    //       if (accountDoc) {
    //         return Promise.reject(
    //           "Email address already exists, please try again with another email."
    //         );
    //       }
    //     });
    //   })
    //   .normalizeEmail(),
    // body("password", "Password should be at least 6 characters long")
    //   .trim()
    //   .isLength({ min: 6 }),
    // body("phoneNumber", "Enter a valid 10 digit phone number")
    //   .trim()
    //   .isLength({ min: 10, max: 12 }),
    // body("firstName", "First Name cannot be empty").trim().not().isEmpty(),
    // body("gender", "Gender cannot be empty").trim().not().isEmpty(),
    // body("role", "Role cannot be empty").trim().not().isEmpty(),
    // body("lastName", "Last Name cannot be empty").trim().not().isEmpty(),
  ],
  employeeController.editEmployee
);

router.get(
  "/get-employees",
  auth.verifyCompany,
  // auth.verifyEmployee,
  employeeController.getEmployees
);

router.get(
  "/get-employee/:employeeId",
  auth.verifyCompany,
  // auth.verifyEmployee,
  employeeController.getEmployee
);

module.exports = router;
