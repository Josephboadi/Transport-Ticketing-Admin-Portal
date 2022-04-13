const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const User = require("../models/user");
const SuperUser = require("../models/superUser");
const Account = require("../models/account");
const Company = require("../models/company");
const cloudinary = require("../middleware/cloudinary");
const { JWT_SECRETE } = require("../config/keys");
const Employee = require("../models/employee");
const CompanyBranch = require("../models/companyBranch");

// const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: "SG.QPM3QWWvR6WPeANVpQ0ANg.",
//       // api_key: process.env.SENDGRID_KEY,
//     },
//   })
// );

const SENDGRID_KEY =
  "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";

sgMail.setApiKey(SENDGRID_KEY);

exports.signupUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const email = req.body.email;
  const firstName = req.body.firstName;
  const password = req.body.password;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const emergencyContactName = req.body.emergencyContactName;
  const emergencyContactNumber = req.body.emergencyContactNumber;
  const role = req.body.role;
  let token;

  if (role !== "ROLE_USER") {
    const error = new Error(
      "Signing up an user should have a role of ROLE_USER"
    );
    error.statusCode = 500;
    throw error;
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      token = crypto.randomBytes(32).toString("hex");

      const account = new Account({
        role: role,
        email: email,
        password: hashedPassword,
        accountVerifyToken: token,
        accountVerifyTokenExpiration: Date.now() + 3600000,
      });
      return account.save();
    })
    .then((savedAccount) => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        emergencyContactName: emergencyContactName,
        emergencyContactNumber: emergencyContactNumber,
        account: savedAccount,
      });
      return user.save();
    })
    .then((savedUser) => {
      sgMail.send({
        to: email,
        from: "joseph.boadi@nalfemconsult.com",
        subject: "Verify your Account on Travelgh",
        html: `
                      <p>Please verify your email by clicking on the link below - Travelgh</p>
                      <p>Click this <a href="https://travel-gh-backend.herokuapp.com/auth/verify/${token}">link</a> to verify your account.</p>
                    `,
      });
      res.status(201).json({
        message:
          "User signed-up successfully, please verify your email before logging in.",
        userId: savedUser._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.signupSuperUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const email = req.body.email;
  const firstName = req.body.firstName;
  const password = req.body.password;
  const lastName = req.body.lastName;

  const role = req.body.role;
  let token;

  if (role !== "ROLE_SUPER_ADMIN") {
    const error = new Error(
      "Signing up an user should have a role of ROLE_SUPER_ADMIN"
    );
    error.statusCode = 500;
    throw error;
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      token = crypto.randomBytes(32).toString("hex");

      const account = new Account({
        role: role,
        email: email,
        password: hashedPassword,
        isVerified: true,
        // accountVerifyToken: token,
        // accountVerifyTokenExpiration: Date.now() + 3600000,
      });
      return account.save();
    })
    .then((savedAccount) => {
      const superUser = new SuperUser({
        firstName: firstName,
        lastName: lastName,
        // phoneNumber: phoneNumber,
        // emergencyContactName: emergencyContactName,
        // emergencyContactNumber: emergencyContactNumber,
        account: savedAccount,
      });
      return superUser.save();
    })
    .then((savedUser) => {
      res.status(201).json({
        message: "Super User signed-up successfully.",
        userId: savedUser._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.signupEmployee = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  // if (!req.file) {
  //   const error = new Error("Upload an image as well.");
  //   error.statusCode = 422;
  //   throw error;
  // }

  let imageUrl = req.body.image;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const password = req.body.password;
  const phoneNumber = req.body.phoneNumber;
  const lastName = req.body.lastName;
  const gender = req.body.gender;
  const role = req.body.role;

  if (req.file) imageUrl = req.file.path;

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

      let token;

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          token = crypto.randomBytes(32).toString("hex");

          const account = new Account({
            role: role,
            email: email,
            password: hashedPassword,
            accountVerifyToken: token,
            accountVerifyTokenExpiration: Date.now() + 3600000,
          });
          return account.save();
        })
        .then(async (savedAccount) => {
          let urls;
          if (imageUrl) {
            try {
              const newPath = await cloudinary.uploader.upload(imageUrl);
              urls = newPath.url;
            } catch (err) {
              console.log(err);
            }
          }

          const employee = new Employee({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            phoneNumber: phoneNumber,
            creator: creator._id,
            account: savedAccount,
            if(imageUrl) {
              imageUrl = urls;
            },
          });
          company.employees.push(employee);
          company.save();
          // employee.save().then((savedEmp) => {
          //   company.employees.push(employee);
          //   return company.save();
          // });
          return employee.save();
        })

        .then((savedEmployee) => {
          sgMail.send({
            to: email,
            from: "joseph.boadi@nalfemconsult.com",
            subject: "Verify your Account on Travelgh",
            html: `
                      <p>Please verify your email by clicking on the link below - Travelgh</p>
                      <p>Click this <a href="http://localhost:5000/auth/verify/${token}">link</a> to verify your account.</p>
                    `,
          });
          res.status(201).json({
            message:
              "Employee signed-up successfully, please verify your email before logging in.",
            employee: savedEmployee,
          });
        });

      // const employeeAccount = new Account({
      //   name: name,
      //   type: type,
      //   imageUrl: imageUrl,
      //   regNumber: regNumber,
      //   capacity: capacity,
      //   driver: driver,
      //   creator: creator._id,
      // });

      // vehicle
      //   .save()
      //   .then((savedVehicle) => {
      //     company.vehicles.push(vehicle);
      //     return company.save();
      //   })
      //   .then((updatedCompany) => {
      //     res.status(201).json({
      //       message: "Vehicle created, Successfully!",
      //       vehicle: vehicle,
      //       creator: { _id: creator._id, name: creator.name },
      //     });
      //   });
    })

    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.verifyAccount = (req, res, next) => {
  const token = req.params.token;
  Account.findOne({
    accountVerifyToken: token,
    accountVerifyTokenExpiration: { $gt: Date.now() },
  })
    .then((account) => {
      if (!account) {
        const error = new Error(
          "Token in the url is tempered, don't try to fool me!"
        );
        error.statusCode = 403;
        throw error;
      }
      account.isVerified = true;
      account.accountVerifyToken = undefined;
      account.accountVerifyTokenExpiration = undefined;
      return account.save();
    })
    .then((account) => {
      res.json({ message: "Account verified successfully." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.loginSuperUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const companyId = req.body.companyId;
  let loadedUser;

  Account.findOne({ email: email })
    .then((account) => {
      if (!account) {
        const error = new Error("Invalid email/password combination.");
        error.statusCode = 401;
        throw error;
      }
      account.companyId = companyId;
      account.save();
      loadedUser = account;

      return bcrypt.compare(password, account.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid email/password combination.");
        error.statusCode = 401;
        throw error;
      }
      if (loadedUser.isVerified === false) {
        const error = new Error(
          "Verify your email before accessing the platform."
        );
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { accountId: loadedUser._id.toString() },
        JWT_SECRETE,
        { expiresIn: "10h" }
      );
      res.status(200).json({ message: "Logged-in successfully", token: token });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const companyId = req.body.companyId;
  let loadedUser;

  Account.findOne({ email: email })
    .then((account) => {
      if (!account) {
        const error = new Error("Invalid email/password combination.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = account;
      return bcrypt.compare(password, account.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid email/password combination.");
        error.statusCode = 401;
        throw error;
      }
      if (loadedUser.isVerified === false) {
        const error = new Error(
          "Verify your email before accessing the platform."
        );
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        { accountId: loadedUser._id.toString() },
        JWT_SECRETE,
        { expiresIn: "10h" }
      );
      res.status(200).json({ message: "Logged-in successfully", token: token });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.signupCompany = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  if (req.files.length == 0) {
    const error = new Error("Upload an image as well.");
    error.statusCode = 422;
    throw error;
  }

  // const arrayFiles = req.files.map((file) => file.path);
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const role = req.body.role;
  const motto = req.body.motto;
  // const payment = req.body.payment;
  // const paymentArray = payment.split(" ");
  const phoneNo = req.body.phoneNo;
  const subLocality = req.body.subLocality;
  const region = req.body.region;
  const formattedAddress = req.body.formattedAddress;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const city = req.body.city;
  const country = req.body.country;
  const zip = req.body.zip;
  // const numReviews = 0;
  // const rating = 0;

  let arrayFiles = [];
  let urls = [];

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

  let token;

  if (role !== "ROLE_COMPANY") {
    const error = new Error(
      "Signing up a company should have a role of ROLE_COMPANY"
    );
    error.statusCode = 500;
    throw error;
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      token = crypto.randomBytes(32).toString("hex");

      const account = new Account({
        role: role,
        email: email,
        password: hashedPassword,
        accountVerifyToken: token,
        accountVerifyTokenExpiration: Date.now() + 3600000,
      });
      return account.save();
    })
    .then((savedAccount) => {
      const company = new Company({
        name: name,
        slug: slugify(name),
        motto: motto,
        imageUrl: arrayFiles,
        account: savedAccount,
        // payment: paymentArray,
        // formattedAddress: formattedAddress,
        numReviews: 0,
        // rating: rating,
        // address: {
        //   street: street,
        //   zip: zip,
        //   phoneNo: phoneNo,
        //   locality: locality,
        //   aptName: aptName,
        //   lat: lat,
        //   lng: lng,
        // },
      });
      return company.save();
    })
    .then((savedCompany) => {
      sgMail.send({
        to: email,
        from: "joseph.boadi@nalfemconsult.com",
        subject: "Verify your Account on Travelgh",
        html: `
                      <p>Please verify your email by clicking on the link below - Travelgh</p>
                      <p>Click this <a href="http://localhost:5000/auth/verify/${token}">link</a> to verify your account.</p>
                    `,
      });
      // res.status(201).json({
      //   message:
      //     "Company signed-up successfully, please verify your email before logging in.",
      //   companyId: savedCompany._id,
      // });
      creator = savedCompany;

      const branch = new CompanyBranch({
        branchName: "Head Office",
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
          savedCompany.branches.push(branch);
          return savedCompany.save();
        })
        .then((updatedCompany) => {
          res.status(201).json({
            message:
              "Company signed-up successfully, please verify your email before logging in.",
            branch: branch,
            creator: { _id: creator._id, name: creator.name },
            companyId: savedCompany._id,
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.imagesTest = (req, res, next) => {
  if (!req.files) {
    const error = new Error("Upload an image as well.");
    error.statusCode = 422;
    throw error;
  }

  const arrayFiles = req.files.map((file) => file.path);
  // console.log(arrayFiles);

  res.status(200).json({ message: "success" });
};
exports.resetPassword = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  let token;

  const email = req.body.email;

  // crypto
  //   .randomBytes(32, (err, buffer) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     const token = buffer.toString("hex");
  token = crypto.randomBytes(32).toString("hex");
  Account.findOne({ email: email })
    .then((account) => {
      if (!account) {
        const error = new Error("Email does not exist.");
        error.statusCode = 401;
        throw error;
      }
      account.resetToken = token;
      account.expireToken = Date.now() + 3600000;
      account.save().then((result) => {
        sgMail.send({
          to: email,
          from: "joseph.boadi@nalfemconsult.com",
          subject: "password reset",
          html: `
                        <p>You requested for password reset</p>
                        <h5>Click this <a href="https://travel-gh-client-portal.herokuapp.com/reset-password/${token}">link</a> to reset your password.</h5>
                      `,
        });
        res.status(201).json({
          message: "check your email",
        });
      });
    })
    // })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.newPassword = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const password = req.body.password;
  const sentToken = req.body.token;

  Account.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  })
    .then((account) => {
      if (!account) {
        const error = new Error("Try again. session expired");
        error.statusCode = 422;
        throw error;
      }
      // console.log(sentToken);
      // console.log(account);

      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          account.password = hashedPassword;
          account.resetToken = undefined;
          account.expireToken = undefined;

          account.save();
        })
        .then((savedUser) => {
          res.status(201).json({
            message: "Password changed successfully.",
          });
        });
    })

    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
