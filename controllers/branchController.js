const path = require("path");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const crypto = require("crypto");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const CompanyBranch = require("../models/companyBranch");
const Company = require("../models/company");
const Account = require("../models/account");
const cloudinary = require("../middleware/cloudinary");

exports.createBranch = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const branchName = req.body.branchName;
  const phoneNo = req.body.phoneNo;
  const subLocality = req.body.subLocality;
  const region = req.body.region;
  const formattedAddress = req.body.formattedAddress;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const city = req.body.city;
  const country = req.body.country;
  const zip = req.body.zip;
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

      const branch = new CompanyBranch({
        branchName: branchName,
        formattedAddress: formattedAddress,
        address: {
          subLocality: subLocality,
          city: city,
          region: region,
          country: country,
          zip: zip,
          phoneNo: phoneNo,
          lat: lat,
          lng: lng,
        },

        creator: creator._id,
      });

      branch
        .save()
        .then((savedBranch) => {
          company.branches.push(branch);
          return company.save();
        })
        .then((updatedCompany) => {
          res.status(201).json({
            message: "Branch created, Successfully!",
            branch: branch,
            creator: { _id: creator._id, name: creator.name },
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.deleteBranch = async (req, res, next) => {
  const branchId = req.params.branchId;
  await CompanyBranch.findById(branchId)
    .then(async (branch) => {
      if (!branch) {
        const error = new Error(
          "Could not find any branch with the given branchId"
        );
        error.statusCode = 404;
        throw error;
      }
      // console.log(employee);

      Account.findById(req.loggedInUserId)
        .then((account) => {
          return Company.findOne({ _id: branch.creator });
        })
        .then((company) => {
          company.branches.pull(branchId);
          return company.save();
        });

      return CompanyBranch.findByIdAndRemove(branchId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Branch deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editBranch = async (req, res, next) => {
  const branchId = req.params.branchId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const branchName = req.body.branchName;
  const phoneNo = req.body.phoneNo;
  const subLocality = req.body.subLocality;
  const region = req.body.region;
  const formattedAddress = req.body.formattedAddress;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const city = req.body.city;
  const country = req.body.country;
  const zip = req.body.zip;

  CompanyBranch.findById(branchId)
    .then((fetchedBranch) => {
      if (!fetchedBranch) {
        const error = new Error(
          "Could not find any Branch with the given branchId"
        );
        error.statusCode = 404;
        throw error;
      }

      if (formattedAddress == "" && lat == "" && lng == "") {
        fetchedBranch.branchName = branchName;
        // fetchedBranch.formattedAddress = formattedAddress;
        fetchedBranch.address.phoneNo = phoneNo;
        fetchedBranch.address.subLocality = subLocality;
        fetchedBranch.address.region = region;
        fetchedBranch.address.city = city;
        fetchedBranch.address.country = country;
        fetchedBranch.address.zip = zip;
        // fetchedBranch.address.lat = lat;
        // fetchedBranch.address.lng = lng;
      } else {
        fetchedBranch.branchName = branchName;
        fetchedBranch.formattedAddress = formattedAddress;
        fetchedBranch.address.phoneNo = phoneNo;
        fetchedBranch.address.subLocality = subLocality;
        fetchedBranch.address.region = region;
        fetchedBranch.address.city = city;
        fetchedBranch.address.country = country;
        fetchedBranch.address.zip = zip;
        fetchedBranch.address.lat = lat;
        fetchedBranch.address.lng = lng;
      }

      return fetchedBranch.save();
    })
    .then((updatedBranch) => {
      res.status(200).json({
        message: "Branch updated",
        branch: updatedBranch,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getBranches = async (req, res, next) => {
  await Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then(async (company) => {
      return await CompanyBranch.find({ _id: { $in: company.branches } }).sort({
        createdAt: -1,
      });
    })
    .then((branches) => {
      res.json({ branches: branches });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getBranch = async (req, res, next) => {
  const branchId = req.params.branchId;
  await CompanyBranch.findById(branchId)
    .then((branch) => {
      if (!branch) {
        const error = new Error(
          "Could not find any Branch with the given branchId"
        );
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({ message: "Branch fetched successfully", branch: branch });
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
