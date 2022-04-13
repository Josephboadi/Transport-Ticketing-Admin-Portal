const express = require("express");
const { body } = require("express-validator");
const mongoose = require("mongoose");

const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// if (!mongoose.Types.ObjectId.isValid(_id)) return false;

// router.get("/companies", userController.getCompanies);
router.get("/clients", userController.getClients);
// router.get("/company/:companyId", userController.getCompany);
router.get("/client/:clientId", userController.getClient);
router.get("/trip/:tripId", userController.getTrip);
router.post(
  "/client/availableTrip/:clientId",
  userController.getAvailableTrips
);
router.get(
  "/client/availableFutureTrip/:compId",
  userController.getFutureTrips
);
router.post("/cart", auth.verifyUser, userController.postCart);

router.get("/cart", auth.verifyUser, userController.getCart);

router.post(
  "/delete-cart-trip",
  auth.verifyUser,
  userController.postCartDelete
);

router.post(
  "/remove-cart-trip/:tripId",
  auth.verifyUser,
  userController.postCartRemove
);

router.post(
  "/user/address",
  auth.verifyUser,
  [
    body("phoneNo", "Enter a valid 10 digit phone number")
      .trim()
      .isLength({ min: 10, max: 10 }),
    body("street", "Street cannot be empty").trim().not().isEmpty(),
    body("locality", "Locality cannot be empty").trim().not().isEmpty(),
    body("aptName", "Apartment name cannot be empty").trim().not().isEmpty(),
    body("zip", "Zipcode cannot be empty").trim().not().isEmpty(),
  ],
  userController.postAddress
);

router.put(
  "/edit-ticketsCount/:tripId",
  auth.verifyUser,
  [body("ticketsCount", "ticketsCount cannot be empty").trim().not().isEmpty()],
  userController.editTripTicketsCount
);

router.get("/user", userController.getLoggedInUser);

router.post("/booking", auth.verifyUser, userController.postBooking);

router.get("/bookings", userController.getBookings);

router.get("/booking/:bookingId", userController.getBooking);

router.post("/booking-status/:bookingId", userController.postBookingStatus);

router.get("/clients/connected", userController.getConnectedClients);

router.get(
  "/clients-location/:lat/:lng/:loc/:dat",
  userController.getClientsByAddress
);

router.post(
  "/:id/reviews",
  auth.verifyUser,
  userController.createCompanyReview
);

router.put("/edit-user/:userId", auth.verifyUser, [], userController.editUser);

module.exports = router;
