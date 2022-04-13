const path = require("path");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const Refund = require("../models/refund");
const Company = require("../models/company");
const Account = require("../models/account");
const Booking = require("../models/booking");

// exports.createLocation = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation Failed, Incorrect data entered.");
//     error.statusCode = 422;
//     error.errors = errors.array();
//     throw error;
//   }

//   const name = req.body.name;
//   const region = req.body.region;
//   let creator;

//   Account.findById(req.loggedInUserId)
//     .then(async (account) => {
//       if (account) {
//         return await Company.findOne({ account: account._id });
//       } else {
//         return await Company.findById(req.loggedInUserId);
//       }
//     })
//     .then((company) => {
//       creator = company;

//       const location = new Location({
//         name: name,
//         region: region,

//         creator: creator._id,
//       });

//       location
//         .save()
//         .then((savedLocation) => {
//           company.locations.push(location);
//           return company.save();
//         })
//         .then((updatedLocation) => {
//           res.status(201).json({
//             message: "Location created, Successfully!",
//             location: location,
//             creator: { _id: creator._id, name: creator.name },
//           });
//         });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

// exports.deleteLocation = (req, res, next) => {
//   const locationId = req.params.locationId;
//   Location.findById(locationId)
//     .then((location) => {
//       if (!location) {
//         const error = new Error(
//           "Could not find any location with the given locationId"
//         );
//         error.statusCode = 404;
//         throw error;
//       }
//       Account.findById(req.loggedInUserId)
//         .then((account) => {
//           return Company.findOne({ _id: location.creator });
//         })
//         .then((company) => {
//           company.locations.pull(locationId);
//           return company.save();
//         });

//       return Location.findByIdAndRemove(locationId);
//     })

//     .then((result) => {
//       res.status(200).json({
//         message: "Location deleted successfully.",
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.editRefund = (req, res, next) => {
  const refundId = req.params.refundId;
  const bookingId = req.params.bookingId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const paymentId = req.body.paymentId;

  Refund.findById(refundId)
    .then(async (fetchedRefund) => {
      if (!fetchedRefund) {
        const error = new Error(
          "Could not find any Refund with the given refundId"
        );
        error.statusCode = 404;
        throw error;
      }

      await Booking.findById(bookingId).then((fetchedBooking) => {
        fetchedBooking.refundPaid = true;

        fetchedBooking.save();
      });

      fetchedRefund.paymentId = paymentId;
      fetchedRefund.refundPaid = true;

      return fetchedRefund.save();
    })
    .then((updatedRefund) => {
      res.status(200).json({
        message: "Refund updated",
        refund: updatedRefund,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getRefunds = (req, res, next) => {
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then(async (company) => {
      return await Refund.find({ _id: { $in: company.refunds } }).sort({
        createdAt: -1,
      });
    })
    .then((refunds) => {
      res.json({ refunds: refunds });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getRefund = (req, res, next) => {
  const refundId = req.params.refundId;
  Refund.findById(refundId)
    .then((refund) => {
      if (!refund) {
        const error = new Error(
          "Could not find any refund with the given refundId"
        );
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "refund fetched successfully", refund: refund });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// const clearImage = (filepath) => {
//   filepath = path.join(__dirname, "../", filepath);
//   fs.unlink(filepath, (err) => {
//     console.log(err);
//   });
// };
