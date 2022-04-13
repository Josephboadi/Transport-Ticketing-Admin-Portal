const path = require("path");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const Location = require("../models/location");
const Company = require("../models/company");
const Account = require("../models/account");

exports.createLocation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const name = req.body.name;
  const region = req.body.region;
  let creator;

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

      const location = new Location({
        name: name,
        region: region,

        creator: creator._id,
      });

      location
        .save()
        .then((savedLocation) => {
          company.locations.push(location);
          return company.save();
        })
        .then((updatedLocation) => {
          res.status(201).json({
            message: "Location created, Successfully!",
            location: location,
            creator: { _id: creator._id, name: creator.name },
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.deleteLocation = (req, res, next) => {
  const locationId = req.params.locationId;
  Location.findById(locationId)
    .then((location) => {
      if (!location) {
        const error = new Error(
          "Could not find any location with the given locationId"
        );
        error.statusCode = 404;
        throw error;
      }
      Account.findById(req.loggedInUserId)
        .then((account) => {
          return Company.findOne({ _id: location.creator });
        })
        .then((company) => {
          company.locations.pull(locationId);
          return company.save();
        });

      return Location.findByIdAndRemove(locationId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Location deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editLocation = (req, res, next) => {
  const locationId = req.params.locationId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const name = req.body.name;
  const region = req.body.region;

  Location.findById(locationId)
    .then((fetchedLocation) => {
      if (!fetchedLocation) {
        const error = new Error(
          "Could not find any Location with the given locationId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedLocation.name = name;
      fetchedLocation.region = region;

      return fetchedLocation.save();
    })
    .then((updatedLocation) => {
      res.status(200).json({
        message: "Location updated",
        location: updatedLocation,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getLocations = (req, res, next) => {
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then((company) => {
      return Location.find({ _id: { $in: company.locations } }).sort({
        createdAt: -1,
      });
    })
    .then((locations) => {
      res.json({ locations: locations });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getLocation = (req, res, next) => {
  const locationId = req.params.locationId;
  Location.findById(locationId)
    .then((location) => {
      if (!location) {
        const error = new Error(
          "Could not find any Location with the given locationId"
        );
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Location fetched successfully", location: location });
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
