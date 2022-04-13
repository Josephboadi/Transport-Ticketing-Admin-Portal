const express = require("express");
const { body } = require("express-validator");

const locationController = require("../controllers/locationController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-location",
  auth.verifyCompany,
  [
    body("name", "Location name cannot be empty").trim().not().isEmpty(),
    body("region", "Region cannot be empty").trim().not().isEmpty(),
  ],
  locationController.createLocation
);

router.delete(
  "/delete-location/:locationId",
  auth.verifyCompany,
  locationController.deleteLocation
);

router.put(
  "/edit-location/:locationId",
  auth.verifyCompany,
  [
    body("name", "Location name cannot be empty").trim().not().isEmpty(),
    body("region", "Region cannot be empty").trim().not().isEmpty(),
  ],
  locationController.editLocation
);

router.get(
  "/get-locations",
  auth.verifyCompany,
  locationController.getLocations
);

router.get(
  "/get-location/:locationId",
  auth.verifyCompany,
  locationController.getLocation
);

module.exports = router;
