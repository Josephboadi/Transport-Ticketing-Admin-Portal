const express = require("express");
const { body } = require("express-validator");

const bookingController = require("../controllers/bookingController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-booking",
  auth.verifyCompany,
  [
    body("taxPrice", "Tax Price cannot be empty").trim().not().isEmpty(),
    body("totalPrice", "Total Price cannot be empty").trim().not().isEmpty(),
    body("quantity", "Quantity cannot be empty").trim().not().isEmpty(),
    body("trip", "TripId cannot be empty").trim().not().isEmpty(),
  ],
  bookingController.createBooking
);

router.delete(
  "/delete-booking/:bookingId",
  auth.verifyCompany,
  bookingController.deleteBooking
);

router.put(
  "/edit-booking/:bookingId",
  auth.verifyCompany,
  [
    body("taxPrice", "Tax Price cannot be empty").trim().not().isEmpty(),
    body("totalPrice", "Total Price cannot be empty").trim().not().isEmpty(),
    body("quantity", "Quantity cannot be empty").trim().not().isEmpty(),
    body("trip", "TripId cannot be empty").trim().not().isEmpty(),
  ],
  bookingController.editBooking
);

router.get("/get-bookings", auth.verifyCompany, bookingController.getBookings);

router.get(
  "/get-booking/:bookingId",
  auth.verifyCompany,
  bookingController.getBooking
);

module.exports = router;
