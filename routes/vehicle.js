const express = require("express");
const { body } = require("express-validator");

const vehicleController = require("../controllers/vehicleController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-vehicle",
  auth.verifyCompany,
  [
    body("name", "Name cannot be empty").trim().not().isEmpty(),
    body("regNumber", "Registration number cannot be empty")
      .trim()
      .not()
      .isEmpty(),
    body("capacity", "Capacity cannot be empty").trim().not().isEmpty(),
  ],
  vehicleController.createVehicle
);

router.delete(
  "/delete-vehicle/:vehicleId",
  auth.verifyCompany,
  vehicleController.deleteVehicle
);

router.put(
  "/edit-vehicle/:vehicleId",
  auth.verifyCompany,
  [
    body("name", "Name cannot be empty").trim().not().isEmpty(),
    body("regNumber", "Registration number cannot be empty")
      .trim()
      .not()
      .isEmpty(),
    body("capacity", "Capacity cannot be empty").trim().not().isEmpty(),
  ],
  vehicleController.editVehicle
);

router.get("/get-vehicles", auth.verifyCompany, vehicleController.getVehicles);

router.get(
  "/get-vehicle/:vehicleId",
  auth.verifyCompany,
  vehicleController.getVehicle
);

module.exports = router;
