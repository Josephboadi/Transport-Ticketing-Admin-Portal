const jwt = require("jsonwebtoken");
const { JWT_SECRETE } = require("../config/keys");

const Account = require("../models/account");
const Employee = require("../models/employee");
const SuperUser = require("../models/superUser");
const User = require("../models/user");

const verifyToken = (req, res) => {
  const authHeader = req.get("Authorization");
  // const paramsHeader = req;
  // console.log(paramsHeader);
  if (!authHeader) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWT_SECRETE);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  return decodedToken.accountId;
};

// exports.verifySuperUser = (req, res, next) => {
//   const companyId = req.params.companyId;
//   const accountId = verifyToken(req, res);
//   Account.findById(accountId)
//     .then(async (account) => {
//       if (!account) {
//         const error = new Error("Internal server error");
//         error.statusCode = 500;
//         throw error;
//       }
//       if (
//         account.role === "ROLE_USER"
//         // account.role !== "ROLE_ADMIN"
//       ) {
//         const error = new Error("Forbidden Access");
//         error.statusCode = 403;
//         throw error;
//       }
//       if (account.role === "ROLE_COMPANY") {
//         const error = new Error("Forbidden Access");
//         error.statusCode = 403;
//         throw error;
//       }
//       if (account.role === "ROLE_ADMIN") {
//         const error = new Error("Forbidden Access");
//         error.statusCode = 403;
//         throw error;
//       }
//       if (account.role === "ROLE_DRIVER") {
//         const error = new Error("Forbidden Access");
//         error.statusCode = 403;
//         throw error;
//       }
//       if (account.role === "ROLE_SALES") {
//         const error = new Error("Forbidden Access");
//         error.statusCode = 403;
//         throw error;
//       }
//       if (account.role === "ROLE_SUPER_ADMIN") {
//         await SuperUser.findOne({ account: account._id }).then((accId) => {
//           req.loggedInUserId = companyId;
//           req.accountDetail = {
//             email: account.email,
//             _id: account._id,
//             role: account.role,
//             name: `${accId.firstName} ${accId.lastName}`,
//             firstName: accId.firstName,
//             lastName: accId.lastName,
//             empId: accId._id,
//           };
//           next();
//         });
//       }
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.verifyCompany = async (req, res, next) => {
  // const companyId = req.params.companyId;
  const accountId = verifyToken(req, res);
  await Account.findById(accountId)
    .then(async (account) => {
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      if (
        account.role === "ROLE_USER"
        // account.role !== "ROLE_ADMIN"
      ) {
        const error = new Error("Forbidden Access");
        error.statusCode = 403;
        throw error;
      }
      // console.log(account.companyId);

      // if (account.role === "ROLE_SUPER_ADMIN") {
      //   await SuperUser.findOne({ account: account._id }).then((accId) => {
      //     req.loggedInUserId = account.companyId;
      //     req.accountDetail = {
      //       email: account.email,
      //       _id: account._id,
      //       role: account.role,
      //       name: `${accId.firstName} ${accId.lastName}`,
      //       firstName: accId.firstName,
      //       lastName: accId.lastName,
      //       empId: accId._id,
      //     };
      //     next();
      //   });
      // }

      if (account.role === "ROLE_COMPANY") {
        req.loggedInUserId = accountId;
        next();
      } else if (account.role === "ROLE_SUPER_ADMIN") {
        await SuperUser.findOne({ account: account._id }).then((accId) => {
          req.loggedInUserId = account.companyId;
          req.accountDetail = {
            email: account.email,
            _id: account._id,
            role: account.role,
            name: `${accId.firstName} ${accId.lastName}`,
            firstName: accId.firstName,
            lastName: accId.lastName,
            empId: accId._id,
          };
          next();
        });
      } else {
        await Employee.findOne({ account: account._id }).then((accId) => {
          req.loggedInUserId = accId.creator;
          req.accountDetail = {
            email: account.email,
            _id: account._id,
            role: account.role,
            name: `${accId.firstName} ${accId.lastName}`,
            firstName: accId.firstName,
            lastName: accId.lastName,
            empId: accId._id,
          };
          next();
        });
      }
    })

    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.verifyEmployee = (req, res, next) => {
//   const accountId = verifyToken(req, res);
//   Account.findById(accountId)
//     .then(async (account) => {
//       if (!account) {
//         const error = new Error("Internal server error");
//         error.statusCode = 500;
//         throw error;
//       }
//       if (account.role === "ROLE_USER") {
//         const error = new Error("Forbidden Access");
//         error.statusCode = 403;
//         throw error;
//       }
//       await Employee.findOne({ account: account._id }).then((accId) => {
//         // console.log(accId);
//         req.loggedInUserId = accId.creator;
//         next();
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.verifyUser = (req, res, next) => {
  const accountId = verifyToken(req, res);
  Account.findById(accountId)
    .then(async (account) => {
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      if (account.role !== "ROLE_USER") {
        const error = new Error("Forbidden Access");
        error.statusCode = 403;
        throw error;
      }
      req.loggedInUserId = accountId;

      next();
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};
