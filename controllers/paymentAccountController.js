const path = require("path");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const PaymentAccount = require("../models/paymentAccount");
const Company = require("../models/company");
const Account = require("../models/account");

exports.createPaymentAccount = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const accountName = req.body.accountName;
  const financialServiceName = req.body.financialServiceName;
  const accountNumber = req.body.accountNumber;
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

      const paymentAccount = new PaymentAccount({
        accountName: accountName,
        financialServiceName: financialServiceName,
        accountNumber: accountNumber,

        creator: creator._id,
      });

      paymentAccount
        .save()
        .then((savedPaymentAccount) => {
          company.paymentaccounts.push(paymentAccount);
          return company.save();
        })
        .then((updatedPaymentAccount) => {
          res.status(201).json({
            message: "Payment Account created, Successfully!",
            paymentAccount: paymentAccount,
            creator: { _id: creator._id, name: creator.name },
          });
        });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.deletePaymentAccount = (req, res, next) => {
  const paymentAccountId = req.params.paymentAccountId;
  PaymentAccount.findById(paymentAccountId)
    .then((paymentAccount) => {
      if (!paymentAccount) {
        const error = new Error(
          "Could not find any payment account with the given paymentAccountId"
        );
        error.statusCode = 404;
        throw error;
      }
      Account.findById(req.loggedInUserId)
        .then((account) => {
          return Company.findOne({ _id: paymentAccount.creator });
        })
        .then((company) => {
          company.paymentaccounts.pull(paymentAccountId);
          return company.save();
        });

      return PaymentAccount.findByIdAndRemove(paymentAccountId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Payment account deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editPaymentAccount = (req, res, next) => {
  const paymentAccountId = req.params.paymentAccountId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const accountName = req.body.accountName;
  const financialServiceName = req.body.financialServiceName;
  const accountNumber = req.body.accountNumber;

  PaymentAccount.findById(paymentAccountId)
    .then((fetchedPaymentAccount) => {
      if (!fetchedPaymentAccount) {
        const error = new Error(
          "Could not find any Payment Account with the given paymentAccountId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedPaymentAccount.accountName = accountName;
      fetchedPaymentAccount.financialServiceName = financialServiceName;
      fetchedPaymentAccount.accountNumber = accountNumber;

      return fetchedPaymentAccount.save();
    })
    .then((updatedPaymentAccount) => {
      res.status(200).json({
        message: "Payment account updated",
        paymentAccount: updatedPaymentAccount,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editPayAccount = (req, res, next) => {
  const payAccountId = req.params.payAccountId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const privateId = req.body.privateId;
  const publicId = req.body.publicId;

  PaymentAccount.findById(payAccountId)
    .then((fetchedPayAccount) => {
      if (!fetchedPayAccount) {
        const error = new Error(
          "Could not find any Payment Account with the given paymentAccountId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedPayAccount.privateId = privateId;
      fetchedPayAccount.publicId = publicId;

      return fetchedPayAccount.save();
    })
    .then((updatedPayAccount) => {
      res.status(200).json({
        message: "Payment account updated",
        payAccount: updatedPayAccount,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getPaymentAccounts = (req, res, next) => {
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        return await Company.findById(req.loggedInUserId);
      }
    })
    .then((company) => {
      return PaymentAccount.find({
        _id: { $in: company.paymentaccounts },
      }).sort({
        createdAt: -1,
      });
    })
    .then((paymentAccounts) => {
      res.json({ paymentAccounts: paymentAccounts });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getPaymentAccount = (req, res, next) => {
  const paymentAccountId = req.params.paymentAccountId;
  PaymentAccount.findById(paymentAccountId)
    .then((paymentAccount) => {
      if (!paymentAccount) {
        const error = new Error(
          "Could not find any payment account with the given paymentAccountId"
        );
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Payment account fetched successfully",
        paymentAccount: paymentAccount,
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
