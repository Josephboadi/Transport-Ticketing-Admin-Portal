const path = require("path");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const Trip = require("../models/trip");
const Company = require("../models/company");
const Account = require("../models/account");
const vehicle = require("../models/vehicle");

exports.createTrip = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const from = req.body.from;
  const to = req.body.to;
  const date = req.body.date;
  const vehicle = req.body.vehicle;
  const ticketsCount = req.body.ticketsCount;
  const branch = req.body.branch;
  const time = req.body.time;
  const tripType = req.body.tripType;
  const fare = req.body.fare;

  let creator;

  let result;
  function range(start, end) {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => start + idx);
  }
  result = range(1, ticketsCount);

  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then((company) => {
      creator = company;

      arrayFiles = result.map((seats) => {
        return { seatNumber: seats, status: "Available" };
      });

      const trip = new Trip({
        from: from,
        to: to,
        date: date,
        time: time,
        fare: fare,
        vehicle: vehicle,
        branch: branch,
        tripType: tripType,
        ticketsCount: ticketsCount,
        seat: arrayFiles,
        creator: creator._id,
      });

      trip
        .save()
        .then((savedTrip) => {
          company.trips.push(trip);
          return company.save();
        })
        .then((updatedTrip) => {
          const {
            _id,
            from,
            to,
            date,
            time,
            fare,
            vehicle,
            tripType,
            seat,
            ticketsCount,
            tripName,
          } = trip;
          res.status(201).json({
            message: "Trip created, Successfully",

            trip: {
              _id,
              from,
              to,
              date,
              time,
              fare,
              vehicle,
              branch,
              tripType,
              ticketsCount,
              seat,
              tripName,
            },
            creator: { _id: creator._id, name: creator.name },
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.deleteTrip = (req, res, next) => {
  const tripId = req.params.tripId;
  Trip.findById(tripId)
    .then((trip) => {
      if (!trip) {
        const error = new Error(
          "Could not find any Trip with the given tripId"
        );
        error.statusCode = 404;
        throw error;
      }

      Account.findById(req.loggedInUserId)
        .then((account) => {
          return Company.findOne({ _id: trip.creator });
        })
        .then((company) => {
          company.trips.pull(tripId);
          return company.save();
        });

      return Trip.findByIdAndRemove(tripId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Trip deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editTrip = (req, res, next) => {
  const tripId = req.params.tripId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const from = req.body.from;
  const to = req.body.to;
  const date = req.body.date;
  const vehicle = req.body.vehicle;
  const branch = req.body.branch;
  const tripType = req.body.tripType;
  const time = req.body.time;
  const ticketsCount = req.body.ticketsCount;
  const fare = req.body.fare;

  Trip.findById(tripId)
    .then((fetchedTrip) => {
      if (!fetchedTrip) {
        const error = new Error(
          "Could not find any Trip with the given tripId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedTrip.from = from;
      fetchedTrip.to = to;
      fetchedTrip.date = date;
      fetchedTrip.vehicle = vehicle;
      fetchedTrip.branch = branch;
      fetchedTrip.time = time;
      fetchedTrip.tripType = tripType;
      fetchedTrip.fare = fare;
      fetchedTrip.ticketsCount = ticketsCount;

      return fetchedTrip.save();
    })
    .then((updatedTrip) => {
      res.status(200).json({
        message: "Trip updated",
        trip: updatedTrip,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getUnschTrips = (req, res, next) => {
  // let today = new Date();
  // today.setDate(today.getDate() - 1);
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then((company) => {
      return Trip.find({ _id: { $in: company.trips } })
        .populate("vehicle")
        .populate({
            path: "vehicle.driver",
            model: "Employee",
          })
        .populate("branch")
        .populate("from")
        .populate("to")
        .sort({
          createdAt: -1,
        });
    })

    .then((trips) => {
      // const availableSTrip = trips.filter((trip) => {
      //   return (
      //     trip.date - today > 0 &&
      //     trip.ticketsCount > 0 &&
      //     trip.tripType === "Unscheduled"
      //   );
      // });

      res.json({
        trips: trips,
        // trips: availableSTrip,
        // num: availableSTrip.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getTrips = (req, res, next) => {
  // let today = new Date();
  // today.setDate(today.getDate() - 1);
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then((company) => {
      return Trip.find({ _id: { $in: company.trips } })
        .populate("vehicle")
        .populate({
      path: "vehicle",
      model: "Vehicle",
      populate: {
        path: "driver",
        model: "Employee",
      },
    })
        .populate("branch")
        .populate("from")
        .populate("to")
        .sort({
          createdAt: -1,
        });
    })

    .then((trips) => {
      // const availableSTrip = trips.filter((trip) => {
      //   return (
      //     trip.date - today > 0 &&
      //     trip.ticketsCount > 0 &&
      //     trip.tripType === "Unscheduled"
      //   );
      // });

      res.json({
        trips: trips,
        // num: availableSTrip.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getTrip = (req, res, next) => {
  const tripId = req.params.tripId;
  Trip.findById(tripId)
    .populate("vehicle")
    .populate("branch")
    .populate("from")
    .populate("to")
    .then((trip) => {
      if (!trip) {
        const error = new Error(
          "Could not find any Trip with the given tripId"
        );
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Trip fetched successfully", trip: trip });
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
