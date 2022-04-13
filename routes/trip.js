const express = require("express");
const { body } = require("express-validator");

const tripController = require("../controllers/tripController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-trip",
  auth.verifyCompany,
  [
    body("from", "Departure location cannot be empty").trim().not().isEmpty(),
    body("to", "Destination location cannot be empty").trim().not().isEmpty(),
    body("date", "Date cannot be empty").trim().not().isEmpty(),
    body("time", "Time cannot be empty").trim().not().isEmpty(),
    body("fare", "Fare cannot be empty").trim().not().isEmpty(),
    body("ticketsCount", "ticketsCount cannot be empty").trim().not().isEmpty(),
    body("vehicle", "Assign a vehicle").trim().not().isEmpty(),
  ],
  tripController.createTrip
);

router.delete(
  "/delete-trip/:tripId",
  auth.verifyCompany,
  tripController.deleteTrip
);

router.put(
  "/edit-trip/:tripId",
  auth.verifyCompany,
  [
    body("from", "Departure location cannot be empty").trim().not().isEmpty(),
    body("to", "Destination location cannot be empty").trim().not().isEmpty(),
    body("date", "Date cannot be empty").trim().not().isEmpty(),
    body("time", "Time cannot be empty").trim().not().isEmpty(),
    body("fare", "Fare cannot be empty").trim().not().isEmpty(),
    body("ticketsCount", "ticketsCount cannot be empty").trim().not().isEmpty(),
    body("vehicle", "Assign a vehicle").trim().not().isEmpty(),
  ],
  tripController.editTrip
);

router.get("/get-schtrips", auth.verifyCompany, tripController.getUnschTrips);

router.get("/get-trips", auth.verifyCompany, tripController.getTrips);

router.get("/get-trip/:tripId", auth.verifyCompany, tripController.getTrip);

module.exports = router;
