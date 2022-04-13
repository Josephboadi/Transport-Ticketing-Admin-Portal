const path = require("path");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const Vehicle = require("../models/vehicle");
const Company = require("../models/company");
const Account = require("../models/account");
const cloudinary = require("../middleware/cloudinary");

exports.createVehicle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  // if (!req.files) {
  //   const error = new Error("Upload an image as well.");
  //   error.statusCode = 422;
  //   throw error;
  // }

  // let imageUrl = [];
  // let urls = [];

  // if (req.files.length > 0) {
  //   try {
  //     const files = req.files;
  //     for (const file of files) {
  //       const { path } = file;
  //       const newPath = await cloudinary.uploader.upload(path);
  //       urls.push(newPath);

  //       imageUrl = urls.map((url) => {
  //         return { img: url.secure_url };
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const imageUrl = req.file.path;
  const name = req.body.name;
  const type = req.body.type;
  const regNumber = req.body.regNumber;
  const capacity = req.body.capacity;
  const driver = req.body.driver;
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

      const vehicle = new Vehicle({
        name: name,
        type: type,
        // imageUrl: imageUrl,
        regNumber: regNumber,
        capacity: capacity,
        driver: driver,
        creator: creator._id,
      });

      vehicle
        .save()
        .then((savedVehicle) => {
          company.vehicles.push(vehicle);
          return company.save();
        })
        .then((updatedCompany) => {
          res.status(201).json({
            message: "Vehicle created, Successfully!",
            vehicle: vehicle,
            creator: { _id: creator._id, name: creator.name },
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.deleteVehicle = (req, res, next) => {
  const vehicleId = req.params.vehicleId;
  Vehicle.findById(vehicleId)
    .then((vehicle) => {
      if (!vehicle) {
        const error = new Error(
          "Could not find any vehicle with the given vehicleId"
        );
        error.statusCode = 404;
        throw error;
      }
      Account.findById(req.loggedInUserId)
        .then((account) => {
          return Company.findOne({ _id: vehicle.creator });
        })
        .then((company) => {
          company.vehicles.pull(vehicleId);
          return company.save();
        });

      return Vehicle.findByIdAndRemove(vehicleId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Vehicle deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editVehicle = async (req, res, next) => {
  const vehicleId = req.params.vehicleId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  // let imageUrl = [];
  // let urls = [];

  // if (req.files.length > 0) {
  //   try {
  //     const files = req.files;
  //     for (const file of files) {
  //       const { path } = file;
  //       const newPath = await cloudinary.uploader.upload(path);
  //       urls.push(newPath);

  //       imageUrl = urls.map((url) => {
  //         return { img: url.secure_url };
  //       });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // let imageUrl = req.body.image;
  const name = req.body.name;
  const capacity = req.body.capacity;
  const regNumber = req.body.regNumber;
  const driver = req.body.driver;
  const type = req.body.type;

  // if (req.file) imageUrl = req.file.path;
  // if (!imageUrl) {
  //   const error = new Error("Image was not found, try again.");
  //   error.statusCode = 404;
  //   throw error;
  // }

  Vehicle.findById(vehicleId)
    .then((fetchedVehicle) => {
      if (!fetchedVehicle) {
        const error = new Error(
          "Could not find any Vehicle with the given vehicleId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedVehicle.name = name;
      fetchedVehicle.capacity = capacity;
      fetchedVehicle.regNumber = regNumber;
      fetchedVehicle.type = type;
      fetchedVehicle.driver = driver;
      // fetchedVehicle.imageUrl = imageUrl;

      return fetchedVehicle.save();
    })
    .then((updatedVehicle) => {
      res.status(200).json({
        message: "Vehicle updated",
        vehicle: updatedVehicle,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getVehicles = async (req, res, next) => {
  await Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then(async (company) => {
      return await Vehicle.find({ _id: { $in: company.vehicles } })
        .populate("driver")
        .sort({
          createdAt: -1,
        });
    })
    .then((vehicles) => {
      res.json({ vehicles: vehicles });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getVehicles =  (req, res, next) => {
//   Account.findById(req.loggedInUserId)
//     .then(async (account) => {
//       // console.log(account);
//       if (account) {
//         return await Company.findOne({ account: account._id });
//       } else {
//         return await Company.findById(req.loggedInUserId);
//       }
//     })
//     .then((company) => {
//       console.log(company);
//       return Vehicle.find({ _id: { $in: company.vehicles } }).populate(
//         "driver"
//       );
//     })
//     .then((vehicles) => {
//       res.json({ vehicles: vehicles });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.getVehicle = async (req, res, next) => {
  const vehicleId = req.params.vehicleId;
  await Vehicle.findById(vehicleId)
    // .populate("driver")
    .then((vehicle) => {
      if (!vehicle) {
        const error = new Error(
          "Could not find any Vehicle with the given vehicleId"
        );
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Vehicle fetched successfully", vehicle: vehicle });
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
