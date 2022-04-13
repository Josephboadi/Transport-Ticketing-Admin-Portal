const path = require("path");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const crypto = require("crypto");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const Employee = require("../models/employee");
const Company = require("../models/company");
const Account = require("../models/account");
const cloudinary = require("../middleware/cloudinary");

exports.deleteCompany = async (req, res, next) => {
  const companyId = req.params.companyId;
  await Company.findById(companyId)
    .then(async (company) => {
      if (!company) {
        const error = new Error(
          "Could not find any company with the given companyId"
        );
        error.statusCode = 404;
        throw error;
      }
      // console.log(employee);
      await Account.findByIdAndRemove(company.account);
      // await Account.findById(company.account)
      //   .then(async (account) => {
      //     return await Company.findOne({ _id: employee.creator });
      //   })
      //   .then((company) => {
      //     company.employees.pull(employeeId);
      //     company.save();
      //     // console.log(company);
      //     return Account.findByIdAndRemove(employee.account);
      //   });

      return Company.findByIdAndRemove(companyId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Company deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editCompany = async (req, res, next) => {
  const companyId = req.params.companyId;
  // const accountId = req.params.accountId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  // let imageUrl = req.body.image;
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  // const role = req.body.role;
  const motto = req.body.motto;
  // const payment = req.body.payment;
  // const paymentArray = payment.split(" ");
  // const phoneNo = req.body.phoneNo;
  // const street = req.body.street;
  // const aptName = req.body.aptName;
  // const formattedAddress = req.body.formattedAddress;
  // const lat = req.body.lat;
  // const lng = req.body.lng;
  // const locality = req.body.locality;
  // const zip = req.body.zip;
  // const numReviews = 0;
  // const rating = 0;

  let arrayFiles = [];
  let urls = [];

  // if (req.file) imageUrl = req.file.path;
  // if (!imageUrl) {
  //   const error = new Error("Image was not found, try again.");
  //   error.statusCode = 404;
  //   throw error;
  // }
  let accountId;

  await Company.findById(companyId).then((company) => {
    if (!company) {
      const error = new Error(
        "Could not find any Company with the given companyId"
      );
      error.statusCode = 404;
      throw error;
    }
    // res.status(200).json({
    // accountId = employee.account;
    // });
    // .then((acc) => {
    if (password) {
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          // token = crypto.randomBytes(32).toString("hex");

          Account.findById(company.account).then((fetchedAccount) => {
            if (!fetchedAccount) {
              const error = new Error(
                "Could not find any Company with the given accountId"
              );
              error.statusCode = 404;
              throw error;
            }
            // if (role) {
            //   fetchedAccount.role = role;
            // }
            // fetchedAccount.role = role;
            fetchedAccount.email = email;
            fetchedAccount.password = hashedPassword;
            // if (password !== "") {
            //   fetchedAccount.password = hashedPassword;
            // }

            return fetchedAccount.save();
          });
        })
        .then((savedAccount) => {
          Company.findById(companyId)
            .then(async (fetchedCompany) => {
              if (!fetchedCompany) {
                const error = new Error(
                  "Could not find any Company with the given companyId"
                );
                error.statusCode = 404;
                throw error;
              }

              if (req.files.length > 0) {
                try {
                  const files = req.files;
                  for (const file of files) {
                    const { path } = file;
                    const newPath = await cloudinary.uploader.upload(path);
                    urls.push(newPath);

                    arrayFiles = urls.map((url) => {
                      return { img: url.secure_url };
                    });
                  }
                } catch (err) {
                  console.log(err);
                }
              }
              // let urls;
              // if (imageUrl) {
              //   try {
              //     const newPath = await cloudinary.uploader.upload(imageUrl);
              //     urls = newPath.url;
              //   } catch (err) {
              //     console.log(err);
              //   }
              // }

              fetchedCompany.name = name;
              fetchedCompany.motto = motto;
              // fetchedCompany.phoneNo = phoneNo;
              // fetchedCompany.street = street;
              // fetchedCompany.aptName = aptName;
              // fetchedCompany.locality = locality;
              // fetchedCompany.zip = zip;
              if (req.files.length > 0) {
                fetchedCompany.imageUrl = arrayFiles;
              }

              return fetchedCompany.save();
            })
            .then((updatedCompany) => {
              res.status(200).json({
                message: "Company info updated",
                company: updatedCompany,
              });
            });
        })

        .catch((err) => {
          if (!err.statusCode) err.statusCode = 500;
          next(err);
        });
    } else {
      // bcrypt
      //   .hash(password, 12)
      //   .then((hashedPassword) => {
      //     token = crypto.randomBytes(32).toString("hex");

      Account.findById(company.account)
        .then((fetchedAccount) => {
          if (!fetchedAccount) {
            const error = new Error(
              "Could not find any Company with the given accountId"
            );
            error.statusCode = 404;
            throw error;
          }
          // if (role) {
          //   fetchedAccount.role = role;
          // }

          fetchedAccount.email = email;
          // if (password !== "") {
          //   fetchedAccount.password = hashedPassword;
          // }

          return fetchedAccount.save();
        })
        // })
        .then((savedAccount) => {
          Company.findById(companyId)
            .then(async (fetchedCompany) => {
              if (!fetchedCompany) {
                const error = new Error(
                  "Could not find any Company with the given companyId"
                );
                error.statusCode = 404;
                throw error;
              }

              if (req.files.length > 0) {
                try {
                  const files = req.files;
                  for (const file of files) {
                    const { path } = file;
                    const newPath = await cloudinary.uploader.upload(path);
                    urls.push(newPath);

                    arrayFiles = urls.map((url) => {
                      return { img: url.secure_url };
                    });
                  }
                } catch (err) {
                  console.log(err);
                }
              }

              // let urls;
              // if (imageUrl) {
              //   try {
              //     const newPath = await cloudinary.uploader.upload(imageUrl);
              //     urls = newPath.url;
              //   } catch (err) {
              //     console.log(err);
              //   }
              // }

              fetchedCompany.name = name;
              fetchedCompany.motto = motto;
              // fetchedCompany.phoneNo = phoneNo;
              // fetchedCompany.street = street;
              // fetchedCompany.aptName = aptName;
              // fetchedCompany.locality = locality;
              // fetchedCompany.zip = zip;
              if (req.files.length > 0) {
                fetchedCompany.imageUrl = arrayFiles;
              }
              // fetchedEmployee.imageUrl = imageUrl;

              return fetchedCompany.save();
            })
            .then((updatedCompany) => {
              res.status(200).json({
                message: "Company info updated",
                company: updatedCompany,
              });
            });
        })

        .catch((err) => {
          if (!err.statusCode) err.statusCode = 500;
          next(err);
        });
    }
  });

  // });

  // let token;
};

exports.verifyCompanyAccount = (req, res, next) => {
  const companyId = req.params.companyId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const isVerified = req.body.isVerified;

  Company.findById(companyId)
    .then((fetchedCompany) => {
      if (!fetchedCompany) {
        const error = new Error(
          "Could not find any Company with the given companyId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedCompany.isVerified = isVerified;

      return fetchedCompany.save();
    })
    .then((updatedCompany) => {
      res.status(200).json({
        message: "Company Verified Successfully",
        company: updatedCompany,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getCompanies = (req, res, next) => {
  // const companyId = req.params.companyId;
  // console.log(req.loggedInUserId);
  // Account.findById(req.loggedInUserId)
  //   .then(async (account) => {
  //     if (account) {
  //       return await Company.findOne({ account: account._id });
  //     } else {
  //       return await Company.findById(req.loggedInUserId);
  //     }
  //   })
  //   .then((company) => {
  //     // console.log(company);
  //     return
  Company.find()
    .populate("account", "_id role email")
    .populate("branches")
    .populate("refunds")
    .sort({
      createdAt: -1,
    })
    .then((companies) => {
      res.json({ companies: companies });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getCompany = (req, res, next) => {
  const companyId = req.params.companyId;
  Company.findById(companyId)
    .populate("account", "_id role email")
    .then((company) => {
      if (!company) {
        const error = new Error(
          "Could not find any Company with the given companyId"
        );
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Company fetched successfully",
        company: company,
      });
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
