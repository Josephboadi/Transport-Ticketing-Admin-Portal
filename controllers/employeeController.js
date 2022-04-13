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

exports.deleteEmployee = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  await Employee.findById(employeeId)
    .then(async (employee) => {
      if (!employee) {
        const error = new Error(
          "Could not find any employee with the given employeeId"
        );
        error.statusCode = 404;
        throw error;
      }
      // console.log(employee);

      await Account.findById(employee.account)
        .then(async (account) => {
          return await Company.findOne({ _id: employee.creator });
        })
        .then((company) => {
          company.employees.pull(employeeId);
          company.save();
          // console.log(company);
          return Account.findByIdAndRemove(employee.account);
        });

      return Employee.findByIdAndRemove(employeeId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Employee deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editEmployee = async (req, res, next) => {
  const employeeId = req.params.employeeId;
  // const accountId = req.params.accountId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  let imageUrl = req.body.image;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const gender = req.body.gender;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;

  if (req.file) imageUrl = req.file.path;
  // if (!imageUrl) {
  //   const error = new Error("Image was not found, try again.");
  //   error.statusCode = 404;
  //   throw error;
  // }
  let accountId;

  await Employee.findById(employeeId).then((employee) => {
    if (!employee) {
      const error = new Error(
        "Could not find any Employee with the given employeeId"
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

          Account.findById(employee.account).then((fetchedAccount) => {
            if (!fetchedAccount) {
              const error = new Error(
                "Could not find any Employee with the given accountId"
              );
              error.statusCode = 404;
              throw error;
            }
            if (role) {
              fetchedAccount.role = role;
            }
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
          Employee.findById(employeeId)
            .then(async (fetchedEmployee) => {
              if (!fetchedEmployee) {
                const error = new Error(
                  "Could not find any Employee with the given employeeId"
                );
                error.statusCode = 404;
                throw error;
              }

              let urls;
              if (imageUrl) {
                try {
                  const newPath = await cloudinary.uploader.upload(imageUrl);
                  urls = newPath.url;
                } catch (err) {
                  console.log(err);
                }
              }

              fetchedEmployee.firstName = firstName;
              fetchedEmployee.lastName = lastName;
              fetchedEmployee.phoneNumber = phoneNumber;
              fetchedEmployee.gender = gender;
              if (imageUrl) {
                fetchedEmployee.imageUrl = urls;
              }

              return fetchedEmployee.save();
            })
            .then((updatedEmployee) => {
              res.status(200).json({
                message: "Employee info updated",
                employee: updatedEmployee,
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

      Account.findById(employee.account)
        .then((fetchedAccount) => {
          if (!fetchedAccount) {
            const error = new Error(
              "Could not find any Employee with the given accountId"
            );
            error.statusCode = 404;
            throw error;
          }
          if (role) {
            fetchedAccount.role = role;
          }

          fetchedAccount.email = email;
          // if (password !== "") {
          //   fetchedAccount.password = hashedPassword;
          // }

          return fetchedAccount.save();
        })
        // })
        .then((savedAccount) => {
          Employee.findById(employeeId)
            .then(async (fetchedEmployee) => {
              if (!fetchedEmployee) {
                const error = new Error(
                  "Could not find any Employee with the given employeeId"
                );
                error.statusCode = 404;
                throw error;
              }

              let urls;
              if (imageUrl) {
                try {
                  const newPath = await cloudinary.uploader.upload(imageUrl);
                  urls = newPath.url;
                } catch (err) {
                  console.log(err);
                }
              }

              fetchedEmployee.firstName = firstName;
              fetchedEmployee.lastName = lastName;
              fetchedEmployee.phoneNumber = phoneNumber;
              fetchedEmployee.gender = gender;
              if (imageUrl) {
                fetchedEmployee.imageUrl = urls;
              }
              // fetchedEmployee.imageUrl = imageUrl;

              return fetchedEmployee.save();
            })
            .then((updatedEmployee) => {
              res.status(200).json({
                message: "Employee info updated",
                employee: updatedEmployee,
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

exports.getEmployees = (req, res, next) => {
  const companyId = req.params.companyId;
  // console.log(req.loggedInUserId);
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then((company) => {
      // console.log(company);
      return Employee.find({ _id: { $in: company.employees } })
        .populate("account", "_id role email")
        .sort({
          createdAt: -1,
        });
    })
    .then((employees) => {
      res.json({ employees: employees });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getEmployee = (req, res, next) => {
  const employeeId = req.params.employeeId;
  Employee.findById(employeeId)
    .populate("account", "_id role email")
    .then((employee) => {
      if (!employee) {
        const error = new Error(
          "Could not find any Employee with the given employeeId"
        );
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Employee fetched successfully",
        employee: employee,
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
