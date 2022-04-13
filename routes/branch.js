const express = require("express");
const { body } = require("express-validator");

const branchController = require("../controllers/branchController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-branch",
  auth.verifyCompany,
  [
    body("branchName", "Branch Name cannot be empty").trim().not().isEmpty(),
    // body("subLocality", "Sub Locality cannot be empty").trim().not().isEmpty(),
    // body("locality", "Locality cannot be empty").trim().not().isEmpty(),
    // body("region", "Region name cannot be empty").trim().not().isEmpty(),
    // body("country", "Country name cannot be empty").trim().not().isEmpty(),
    body("zip", "Zipcode cannot be empty").trim().not().isEmpty(),
    body("phoneNo", "Enter a valid 10 digit phone number")
      .trim()
      .isLength({ min: 10, max: 12 }),
  ],
  branchController.createBranch
);

router.delete(
  "/delete-branch/:branchId",
  auth.verifyCompany,
  branchController.deleteBranch
);

router.put(
  "/edit-branch/:branchId",
  auth.verifyCompany,
  branchController.editBranch
);

router.get("/get-branches", auth.verifyCompany, branchController.getBranches);

router.get(
  "/get-branch/:branchId",
  auth.verifyCompany,
  branchController.getBranch
);

module.exports = router;
