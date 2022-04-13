const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require("moment");
const Company = require("../models/company");
const Trip = require("../models/trip");
const User = require("../models/user");
const Account = require("../models/account");
const Employee = require("../models/employee");
const SuperUser = require("../models/superUser");
const Booking = require("../models/booking");
const Vehicle = require("../models/vehicle");
const io = require("../util/socket");
const app = require("../app");
const { JWT_SECRETE } = require("../config/keys");
const trip = require("../models/trip");
const account = require("../models/account");
const CompanyBranch = require("../models/companyBranch");

function flatten(arr) {
  return arr.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),
    []
  );
}

exports.getSuperClients = (req, res, next) => {
  Company.find()
    .populate("account", "isVerified")
    .populate("branches")
    .sort({ createdAt: -1 })
    .then((companies) => {
      const companiesFinal = companies.filter((company) => {
        return company.account.isVerified === true;
      });
      res.status(200).json({
        companies: companiesFinal,
        totalItems: companiesFinal.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getClients = (req, res, next) => {
  Company.find()
    .populate("account", "isVerified")
    .populate("branches")
    .sort({ createdAt: -1 })
    .then((companies) => {
      const companiesFinal = companies.filter((company) => {
        return (
          company.account.isVerified === true && company.isVerified === true
        );
      });
      res.status(200).json({
        companies: companiesFinal,
        totalItems: companiesFinal.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getRestaurants = (req, res, next) => {
//   const currentPage = req.query.page || 1;
//   const perPage = 6;
//   let totalItems;
//   Seller.find()
//     .countDocuments()
//     .then((totalCount) => {
//       totalItems = totalCount;

//       return Seller.find().sort({ createdAt: -1 });
//       // .skip((currentPage - 1) * perPage)
//       // .limit(perPage);
//     })
//     .then((sellers) => {
//       res.status(200).json({
//         restaurants: sellers,
//         totalItems: totalItems,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

// exports.getCompanyById = async (req, res) => {
//   const company = await Company.findById(req.params.id);
//   if (company) {
//     res.json(company);
//   } else {
//     //   res.status(404).json({ message: " Product not found" });
//     res.status(404);
//     throw new Error("company not found");
//   }
// };

exports.getClient = async (req, res, next) => {
  const clientId = req.params.clientId;
  await Company.findById(clientId)
    .populate("trips")
    .populate("locations")
    .populate("vehicles")
    // .then((seller) => {
    //   return Item.find({ _id: { $in: seller.items } });
    // })
    .then((client) => {
      client.populate("vehicle").execPopulate();
      res.json({ result: client });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getAvailableVehicle = async (req, res, next) => {
//   const vehicleId = req.params.vehicleId;
//   await Vehicle.findById(vehicleId)
//     .populate("creator")
//     .then((veh) => {
//       res.json({ result: veh });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.getTrip = async (req, res, next) => {
  const tripId = req.params.tripId;
  await Trip.findById(tripId)
    .populate("vehicle")
    .populate("from")
    .populate("to")
    .then((trip) => {
      res.json({ result: trip });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getTrip = async (req, res, next) => {
//   const tripId = req.params.tripId;
//   await Trip.findById(tripId)
//     .populate("vehicle")
//     .populate("from")
//     .populate("to")
//     .then((trip) => {
//       res.json({ result: trip });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

// exports.getPaymentAccounts = async (req, res, next) => {
//   const compId = req.params.compId;
//   await Company.findById(compId)
//     .populate("paymentaccounts")
//     .sort({
//       createdAt: -1,
//     })
//     .then((payment) => {
//       res.json({ paymentAccounts: payment });

//       //   return Trip.find({ _id: { $in: company.trips } })
//       //     .populate("vehicle")
//       //     .populate("from")
//       //     .populate("to");
//       // })

//       // .then((trips) => {
//       //   res.json({
//       //     trips: trips,
//       //   });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.getFutureTrips = async (req, res, next) => {
  const compId = req.params.compId;
  await Company.findById(compId)
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "from",
        model: "Location",
      },
    })
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "to",
        model: "Location",
      },
    })
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "vehicle",
        model: "Vehicle",
      },
    })
    .populate("locations")
    .populate("vehicles")
    .sort({
      createdAt: -1,
    })
    .then((company) => {
      const availableFutureTrip = company.trips.filter((trip) => {
        // console.log(trip.tripName);
        // console.log(moment(trip.date).format("DD MMM, YYYY"));
        // console.log(moment(date).format("DD MMM, YYYY"));
        return (
          // trip.tripName === `${from} - ${to}` &&
          // moment(date).format("DD MMM, YYYY") <=
          // moment(trip.date).format("DD MMM, YYYY") &&
          moment(new Date()).format("DD MMM, YYYY") <=
            moment(trip.date).format("DD MMM, YYYY") &&
          trip.ticketsCount > 0 &&
          trip.tripName === "Scheduled"
        );
      });

      res.json({ result: availableFutureTrip });

      //   return Trip.find({ _id: { $in: company.trips } })
      //     .populate("vehicle")
      //     .populate("from")
      //     .populate("to");
      // })

      // .then((trips) => {
      //   res.json({
      //     trips: trips,
      //   });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getPayAccounts = async (req, res, next) => {
//   const compId = req.params.compId;
//   await Company.findById(compId)
//     .populate({
//       path: "trips",
//       model: "Trip",
//       populate: {
//         path: "from",
//         model: "Location",
//       },
//     })
//     .populate({
//       path: "trips",
//       model: "Trip",
//       populate: {
//         path: "to",
//         model: "Location",
//       },
//     })
//     .populate({
//       path: "trips",
//       model: "Trip",
//       populate: {
//         path: "vehicle",
//         model: "Vehicle",
//       },
//     })
//     .populate("locations")
//     .populate("vehicles")
//     .sort({
//       createdAt: -1,
//     })
//     .then((company) => {
//       const availableFutureTrip = company.trips.filter((trip) => {
//         // console.log(trip.tripName);
//         // console.log(moment(trip.date).format("DD MMM, YYYY"));
//         // console.log(moment(date).format("DD MMM, YYYY"));
//         return (
//           // trip.tripName === `${from} - ${to}` &&
//           // moment(date).format("DD MMM, YYYY") <=
//           // moment(trip.date).format("DD MMM, YYYY") &&
//           moment(new Date()).format("DD MMM, YYYY") <=
//             moment(trip.date).format("DD MMM, YYYY") && trip.ticketsCount > 0
//         );
//       });

//       res.json({ result: availableFutureTrip });

//       //   return Trip.find({ _id: { $in: company.trips } })
//       //     .populate("vehicle")
//       //     .populate("from")
//       //     .populate("to");
//       // })

//       // .then((trips) => {
//       //   res.json({
//       //     trips: trips,
//       //   });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.getPayAccounts = async (req, res, next) => {
  const compaId = req.params.compaId;
  if (compaId.match(/^[0-9a-fA-F]{24}$/)) {
    return await Company.findById(compaId)
      .populate("paymentaccounts")
      .sort({
        createdAt: -1,
      })
      .then((company) => {
        // const availableFutureTrip = company
        res.json({ paymentAccounts: company });
      })
      .catch((err) => {
        if (!err.statusCode) err.statusCode = 500;
        next(err);
      });
  }
};

exports.getAvailableTrips = async (req, res, next) => {
  const clientId = req.params.clientId;
  const from = req.body.from;
  const to = req.body.to;
  const date = req.body.date;

  await Company.findById(clientId)
    // .populate("trips")
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "from",
        model: "Location",
      },
    })
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "to",
        model: "Location",
      },
    })
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "vehicle",
        model: "Vehicle",
      },
    })
    .populate("locations")
    .populate("vehicles")
    .sort({
      createdAt: -1,
    })
    // .then((seller) => {
    //   return Item.find({ _id: { $in: seller.items } });
    // })
    .then((client) => {
      // const loc = client.populate({
      //   path: "client.trips.trip.from",
      //   model: "Location",
      // });
      // console.log(client);
      const availableTrip = client.trips.filter((trip) => {
        // console.log(trip.tripName);
        // console.log(moment(trip.date).format("DD MMM, YYYY"));
        // console.log(moment(date).format("DD MMM, YYYY"));
        return (
          trip.tripName === `${from} - ${to}` &&
          moment(date).format("DD MMM, YYYY") <=
            moment(trip.date).format("DD MMM, YYYY") &&
          moment(new Date()).format("DD MMM, YYYY") <=
            moment(date).format("DD MMM, YYYY") &&
          trip.ticketsCount > 0 &&
          trip.tripName === "Scheduled"
        );
      });

      res.json({ result: availableTrip });
    })

    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getCompany = (req, res, next) => {
//   const { companyId } = req.params;

//   Company.findById({ _id: companyId })
//     .then((company) => {
//       if (!company) {
//         const error = new Error(
//           "Could not find any Company with the given companyId"
//         );
//         error.statusCode = 404;
//         throw error;
//       } else {
//         res.status(200).json({
//           message: "Company fetched successfully",
//           company: company,
//         });
//       }
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.postCart = (req, res, next) => {
  const tripId = req.body.tripId;
  const quantity = req.body.quantity;
  let targetTrip;
  if (!tripId) {
    const error = new Error("TripId not provided");
    error.statusCode = 404;
    throw error;
  }
  Trip.findById(tripId)

    .then((trip) => {
      targetTrip = { trip, quantity };
      return Account.findById(req.loggedInUserId);
    })
    .then((account) => {
      return User.findOne({ account: account._id });
    })
    .then((user) => {
      return user.addToCart(targetTrip);
    })
    .then((result) => {
      res.status(200).json({ message: "Trip successfully added to cart." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getCart = (req, res, next) => {
  Account.findById(req.loggedInUserId)
    .then((account) => {
      return User.findOne({ account: account._id });
    })
    .then((user) => {
      // return user.populate("cart.trips.tripId").
      return user
        .populate({
          path: "cart.trips.tripId",
          model: "Trip",
          populate: [
            { path: "to", model: "Location" },
            { path: "from", model: "Location" },
            { path: "vehicle", model: "Vehicle" },
          ],
        })
        .execPopulate();
    })
    .then((user) => {
      const cartTrips = user.cart.trips;
      let totalPrice = 0;
      cartTrips.forEach((trip) => {
        totalPrice = totalPrice + trip.quantity * trip.tripId.fare;
        // trip.populate("trip.tripId.vehicle").execPopulate();
      });
      res.json({ cart: cartTrips, totalPrice: totalPrice });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postCartDelete = (req, res, next) => {
  const tripId = req.body.tripId;
  if (!tripId) {
    const error = new Error("TripId not provided");
    error.statusCode = 404;
    throw error;
  }
  Account.findById(req.loggedInUserId)
    .then((account) => {
      return User.findOne({ account: account._id });
    })
    .then((user) => {
      return user.removeFromCart(tripId);
    })
    .then((result) => {
      res.status(200).json({ message: "Trip successfully removed from cart." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postCartRemove = (req, res, next) => {
  const tripId = req.params.tripId;
  if (!tripId) {
    const error = new Error("TripId not provided");
    error.statusCode = 404;
    throw error;
  }
  Account.findById(req.loggedInUserId)
    .then((account) => {
      return User.findOne({ account: account._id });
    })
    .then((user) => {
      return user.reduceQuantity(tripId);
    })
    .then((result) => {
      res.status(200).json({ message: "Trip successfully updated." });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postAddress = (req, res, next) => {
  // const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  //   // Build your resulting errors however you want! String, object, whatever - it works!
  //   return `${param}: ${msg}`;
  // };
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const phoneNo = req.body.phoneNo;
  const street = req.body.street;
  const locality = req.body.locality;
  const aptName = req.body.aptName;
  const zip = req.body.zip;
  const lat = req.body.lat;
  const lng = req.body.lng;
  const formattedAddress = req.body.formattedAddress;

  Account.findById(req.loggedInUserId)
    .then((account) => {
      return User.findOne({ account: account._id });
    })
    .then((user) => {
      return User.findByIdAndUpdate(
        { _id: user._id },
        {
          address: {
            street: street,
            locality: locality,
            zip: zip,
            phoneNo: phoneNo,
            aptName: aptName,
            lat: lat,
            lng: lng,
          },
          formattedAddress: formattedAddress,
        },
        { new: true }
      );
    })
    .then((result) => {
      res.json({ trip: result });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getLoggedInUser = (req, res, next) => {
  const authHeader = req.get("Authorization");
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

  const accountId = decodedToken.accountId;
  let accountObj;
  let companyObj;
  // console.log(accountId);

  Account.findById(accountId)
    .then(async (account) => {
      // console.log(account);
      if (!account) {
        const error = new Error("Internal server error");
        error.statusCode = 500;
        throw error;
      }
      accountObj = account;
      return await User.findOne({ account: account._id }).populate({
        path: "account",
        select: ["email", "role"],
      });
    })
    .then(async (user) => {
      if (user) {
        return user;
      } else {
        // return await Company.findOne({ account: accountObj._id });
        if (accountObj.role === "ROLE_COMPANY") {
          return await Company.findOne({ account: accountObj._id })
            .select("-password")
            .populate("trips")
            .populate("account", "email role");
        } else if (accountObj.role === "ROLE_SUPER_ADMIN") {
          await SuperUser.findOne({ account: accountObj._id }).then(
            async (empDet) => {
              // console.log(empDet);
              await Company.findOne({ _id: accountObj.companyId })
                .select("-password")
                .populate("trips")
                .populate("account", "email role")
                .then((result) => {
                  // console.log(result);

                  return res.json({
                    result,
                    empDet: accountObj,
                    accountDetails: {
                      firstName: empDet.firstName,
                      lastName: empDet.lastName,
                      image: empDet.pic,
                      // phoneNumber: empDet.phoneNumber,
                      // gender: empDet.gender,
                      empId: empDet._id,
                    },
                  });
                });
              // console.log(empDet);
            }
          );
        } else {
          await Employee.findOne({ account: accountObj._id }).then(
            async (empDet) => {
              // console.log(empDet);
              await Company.findOne({ _id: empDet.creator })
                .select("-password")
                .populate("trips")
                .populate("account", "email role")
                .then((result) => {
                  // console.log(result);

                  return res.json({
                    result,
                    empDet: accountObj,
                    accountDetails: {
                      firstName: empDet.firstName,
                      lastName: empDet.lastName,
                      image: empDet.imageUrl,
                      phoneNumber: empDet.phoneNumber,
                      gender: empDet.gender,
                      empId: empDet._id,
                    },
                  });
                });
              // console.log(empDet);
            }
          );
        }
      }
    })
    .then((result) => {
      // console.log(result);
      res.json({ result });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.postBooking = (req, res, next) => {
  const taxPrice = req.body.taxPrice;
  const totalPrice = req.body.totalPrice;
  const seatNumber = req.body.seatNumber;
  const id = req.body.id;
  const status = req.body.status;
  const update_time = req.body.update_time;
  const email_address = req.body.email_address;

  // if (!taxPrice) {
  //   const error = new Error("taxPrice not provided");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // if (!totalPrice) {
  //   const error = new Error("totalPrice not provided");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // if (!id) {
  //   const error = new Error("id not provided");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // if (!status) {
  //   const error = new Error("status not provided");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // if (!update_time) {
  //   const error = new Error("update_time not provided");
  //   error.statusCode = 404;
  //   throw error;
  // }

  // if (!email_address) {
  //   const error = new Error("email_address not provided");
  //   error.statusCode = 404;
  //   throw error;
  // }

  let accountObj;
  let userObj;
  Account.findById(req.loggedInUserId)
    .then((account) => {
      accountObj = account;
      return User.findOne({ account: account._id });
    })
    .then((user) => {
      userObj = user;
      return user.populate("cart.trips.tripId").execPopulate();
    })
    .then((result) => {
      const companies = result.cart.trips.reduce((acc, trip) => {
        if (!acc[trip.tripId.creator]) {
          acc[trip.tripId.creator] = [];
        }

        acc[trip.tripId.creator].push(trip);
        return acc;
      }, {});

      for (let [company, cartTrip] of Object.entries(companies)) {
        Company.findById(company)
          .populate({ path: "branches", model: "CompanyBranch" })
          .then((company) => {
            // console.log(company);
            const trips = cartTrip.map((i) => {
              return {
                quantity: i.quantity,
                trip: {
                  ...i.tripId._doc,
                },
              };
            });

            const bookingDetail = new Booking({
              taxPrice: taxPrice,
              totalPrice: totalPrice,
              seatNumber: seatNumber,
              paymentResult: {
                id: id,
                status: status,
                update_time: update_time,
                email_address: email_address,
              },
              user: {
                email: accountObj.email,
                name: result.firstName,
                phoneNo: result.phoneNumber,
                relativeName: result.emergencyContactName,
                relativePhone: result.emergencyContactNumber,
                address: result.address,
                userId: result,
              },
              trips: trips,
              status: "Booked",
              company: {
                name: company.name,
                phone: company.branches[0].address.phoneNo,
                imageUrl: company.imageUrl[0].img,
                companyId: company,
              },

              isPaid: true,
              paidAt: Date.now(),
            });

            return bookingDetail.save();
            // for (const clientId of Object.keys(app.clients)) {
            //   // console.log(app.clients[clientId].socket);
            //   if (clientId.toString() === company._id.toString()) {
            //     io.getIO().sockets.connected[
            //       app.clients[clientId].socket
            //     ].emit("bookings", { action: "create", booking: booking });
            //   }
            // }
          });
      }
      // return result;
    })
    .then((result) => {
      return userObj.clearCart();
    })
    .then((result) => {
      res.status(200).json({ message: "booked successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editTripTicketsCount = (req, res, next) => {
  const authHeader = req.get("Authorization");
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

  const accountId = decodedToken.accountId;

  const tripId = req.params.tripId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const ticketsCount = req.body.ticketsCount;

  Trip.findById(tripId)
    .then((fetchedTrip) => {
      if (!fetchedTrip) {
        const error = new Error(
          "Could not find any Trip with the given tripId"
        );
        error.statusCode = 404;
        throw error;
      }

      fetchedTrip.ticketsCount = ticketsCount;

      return fetchedTrip.save();
    })
    .then((updatedTrip) => {
      res.status(200).json({
        message: "ticketsCount updated",
        trip: updatedTrip,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.editTripTicketsCount = (req, res, next) => {
//   const tripId = req.params.tripId;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation Failed, Incorrect data entered.");
//     error.statusCode = 422;
//     error.errors = errors.array();
//     throw error;
//   }

//   const ticketsCount = req.body.ticketsCount;

//   Trip.findById(tripId)
//     .then((fetchedTrip) => {
//       if (!fetchedTrip) {
//         const error = new Error(
//           "Could not find any Trip with the given tripId"
//         );
//         error.statusCode = 404;
//         throw error;
//       }

//       fetchedTrip.ticketsCount = ticketsCount;

//       return fetchedTrip.save();
//     })
//     .then((updatedTrip) => {
//       res.status(200).json({
//         message: "ticketsCount updated",
//         trip: updatedTrip,
//       });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.getBookings = (req, res, next) => {
  const authHeader = req.get("Authorization");
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

  const accountId = decodedToken.accountId;

  Account.findById(accountId)
    .then(async (account) => {
      if (account.role === "ROLE_USER")
        return User.findOne({ account: account._id });
      if (account.role === "ROLE_COMPANY") {
        return Company.findOne({ account: account._id });
      }
      // else {
      //   await Employee.findOne({ account: account._id }).then(
      //     async (empDet) => {
      //       await Company.findOne({ _id: empDet.creator })
      //         .then((result) => {
      //           if (result instanceof Company)
      //             return Booking.find({ "company.companyId": result._id }).sort(
      //               {
      //                 createdAt: -1,
      //               }
      //             );
      //           // return res.json({ result, empDet: account });
      //         })
      //         .then((bookings) => {
      //           res.status(200).json({ bookings, empDet: account });
      //         });
      //     }
      //   );
      // }
    })
    .then((result) => {
      if (result instanceof User)
        return Booking.find({ "user.userId": result._id })
          .populate({
            path: "trips.trip.from",
            model: "Location",
          })
          .populate({
            path: "trips.trip.to",
            model: "Location",
          })
          .populate({
            path: "trips.trip.vehicle",
            model: "Vehicle",
          })
          .populate({
            path: "trips.trip.branch",
            model: "CompanyBranch",
          })
          .sort({
            createdAt: -1,
          });
      if (result instanceof Company)
        return Booking.find({ "company.companyId": result._id })
          .populate({
            path: "trips.trip.from",
            model: "Location",
          })
          .populate({
            path: "trips.trip.to",
            model: "Location",
          })
          .populate({
            path: "trips.trip.vehicle",
            model: "Vehicle",
          })
          .populate({
            path: "trips.trip.branch",
            model: "CompanyBranch",
          })
          .sort({
            createdAt: -1,
          });
    })
    .then((bookings) => {
      res.status(200).json({ bookings });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getBooking = (req, res, next) => {
  const authHeader = req.get("Authorization");
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

  const accountId = decodedToken.accountId;

  const bookingId = req.params.bookingId;
  // if (!req.body.status) {
  //   const error = new Error("Status Not Provided");
  //   error.statusCode = 404;
  //   throw error;
  // }
  // const status = req.body.status;
  Booking.findById(bookingId)
    .populate({
      path: "trips.trip.from",
      model: "Location",
    })
    .populate({
      path: "trips.trip.to",
      model: "Location",
    })
    .populate({
      path: "trips.trip.vehicle",
      model: "Vehicle",
    })
    .populate({
      path: "trips.trip.branch",
      model: "CompanyBranch",
    })
    .then((booking) => {
      // if (!booking) {
      //   const error = new Error(
      //     "Could not find any Booking with the given bookingId"
      //   );
      //   error.statusCode = 404;
      //   throw error;
      // }

      res.status(200).json({ booking: booking });
    })
    // .then((updatedBooking) => {
    //   io.getIO().emit("bookings", { action: "update", order: updatedBooking });
    //   res.status(200).json({ updatedBooking });
    // })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.getBooking = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     const error = new Error("Not authenticated");
//     error.statusCode = 401;
//     throw error;
//   }

//   const token = authHeader.split(" ")[1];
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, JWT_SECRETE);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     const error = new Error("Not authenticated");
//     error.statusCode = 401;
//     throw error;
//   }

//   const accountId = decodedToken.accountId;

//   const bookingId = req.params.bookingId;
//   // if (!req.body.status) {
//   //   const error = new Error("Status Not Provided");
//   //   error.statusCode = 404;
//   //   throw error;
//   // }
//   // const status = req.body.status;
//   Account.findById(accountId)
//     .then((account) => {
//       if (account.role === "ROLE_USER")
//         return User.findOne({ account: account._id });
//       if (account.role === "ROLE_COMPANY")
//         return Company.findOne({ account: account._id });
//     })
//     .then((result) => {
//       if (result instanceof User)
//         return Booking.find({ "user.userId": result._id }).sort({
//           createdAt: -1,
//         });
//       if (result instanceof Company)
//         return Booking.find({ "company.companyId": result._id }).sort({
//           createdAt: -1,
//         });
//     })
//     .then((bookings) => {
//       // const bookingTripId = bookings.trips._id;
//       // return Booking.find({ "trips._id": tripId });
//       // res.status(200).json({ bookings });
//       const booking = bookings.filter((book) => {
//         return book._id.toString() === bookingId;
//       });

//       res.status(200).json({ booking });
//     })
//     // .then(() => {
//     //   res.status(200).json({ booking:booking });
//     // })
//     // Booking.findById((trips._id = tripId))
//     //   .then((booking) => {
//     //     if (!booking) {
//     //       const error = new Error(
//     //         "Could not find any Booking with the given bookingId"
//     //       );
//     //       error.statusCode = 404;
//     //       throw error;
//     //     }
//     //     res.status(200).json({ booking });
//     //     // booking.status = status;
//     //     // return booking.save();
//     //   })
//     // .then((updatedBooking) => {
//     //   io.getIO().emit("bookings", { action: "update", order: updatedBooking });
//     //   res.status(200).json({ updatedBooking });
//     // })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.postBookingStatus = (req, res, next) => {
  const authHeader = req.get("Authorization");
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

  const accountId = decodedToken.accountId;

  const bookingId = req.params.bookingId;
  if (!req.body.status) {
    const error = new Error("Status Not Provided");
    error.statusCode = 404;
    throw error;
  }
  const status = req.body.status;
  Booking.findById(bookingId)
    .then((booking) => {
      if (!booking) {
        const error = new Error(
          "Could not find any Booking with the given bookingId"
        );
        error.statusCode = 404;
        throw error;
      }

      booking.status = status;
      return booking.save();
    })
    .then((updatedBooking) => {
      io.getIO().emit("bookings", { action: "update", order: updatedBooking });
      res.status(200).json({ updatedBooking });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getConnectedClients = (req, res, next) => {
  res.json({ clients: app.clients });
};

exports.createCompanyReview = async (req, res) => {
  const { rating, comment } = req.body;
  let userDetail;
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      return await User.findOne({ account: account._id });
    })
    .then(async (user) => {
      const company = await Company.findById(req.params.id);

      if (company) {
        // const alreadyReviewed = company.reviews.find(
        //   (r) => r.user.toString() === req.user._id.toString()
        // );

        // if (alreadyReviewed) {
        //   res.status(400);
        //   throw new Error("Product already reviewed");
        // }

        const review = {
          name: user.firstName,
          rating: Number(rating),
          comment,
          user: user._id,
        };

        company.reviews.push(review);

        company.numReviews = company.reviews.length;

        company.rating =
          company.reviews.reduce((acc, item) => item.rating + acc, 0) /
          company.reviews.length;

        await company.save();
        res.status(201).json({ message: "Review added" });
      } else {
        res.status(404);
        throw new Error("company not found");
      }
    });
  // console.log(userDetail);
  // .then((result) => {
  //   res.json({ trip: result });
  // })
  // .catch((err) => {
  //   if (!err.statusCode) err.statusCode = 500;
  //   next(err);
  // });
};

exports.getClientsByAddress = (req, res, next) => {
  const lat1 = req.params.lat;
  const lon1 = req.params.lng;
  const loc1 = req.params.loc;
  const dat1 = req.params.dat;

  // console.log(moment(dat1).format("DD MMM, YYYY"));

  Company.find()
    .populate("account", "isVerified")
    .populate("vehicles")
    .populate("branches")
    // .populate("trips")
    .populate({
      path: "trips",
      model: "Trip",
      populate: {
        path: "to",
        model: "Location",
      },
    })
    // .populate("location")
    // .populate("branches")

    .sort({ createdAt: -1 })
    .then((companies) => {
      const companiesVerified = companies.filter((client) => {
        return client.account.isVerified === true && client.isVerified === true;
      });
      // let companiesLatLng;
      // let companiesBranches = [];
      // companiesBranches = companiesVerified.find((branch) => {
      //   // companiesLatLng = branch.branches;
      //   // trial = branch;
      //   return branch.branches;
      //   // return companiesLatLng;
      // });

      // const companiesBranch = [companiesBranches];
      // console.log(companiesBranch);
      // console.log(companiesVerified);
      // const flattened = flatten(companiesVerified);
      // console.log(flattened);

      const companiesFinal = companiesVerified.reduce((result, company) => {
        // const lat2 = company.banches;
        // console.log(lat2);
        let lat2;
        let lon2;

        const flattened = flatten(company.branches);
        const flattened1 = flatten(company.trips);
        // console.log(flattened);

        // lat2 = flattened.address.lat;
        // lon2 = flattened.address.lng;

        // if (!acc[trip.tripId.creator]) {
        //   acc[trip.tripId.creator] = [];
        // }

        // lat2 = branches[address.lat];
        // lon2 = branches[address.lng];

        // console.log(lat2);
        // acc[trip.tripId.creator].push(trip);
        // return acc;

        // company.branches.include(
        //   (lat) => ((lat2 = lat.address.lat), (lon2 = lat.address.lng))
        // );
        const conp = company.branches;

        flattened.forEach(function (ele) {
          flattened1.forEach(function (tri) {
            lat2 = ele.address.lat;
            lon2 = ele.address.lng;
            // console.log(ele.address.lat);
            // console.log(ele.address.lng);
            const R = 6371; // kms
            const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
            const φ2 = (lat2 * Math.PI) / 180;
            const Δφ = ((lat2 - lat1) * Math.PI) / 180;
            const Δλ = ((lon2 - lon1) * Math.PI) / 180;

            const a =
              Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const d = R * c; // in km
            // console.log(d);
            // console.log(tri.date);
            // console.log(moment(tri.date).format("DD MMM, YYYY"));
            if (
              d < 10 &&
              tri.to.name == loc1 &&
              moment(tri.date).format("DD MMM, YYYY") ==
                moment(dat1).format("DD MMM, YYYY")
            )
              result.push(company);
          });
        });

        // const lat2 = JSON.stringify(company.branches.address.lat);
        // const lon2 = JSON.stringify(company.branches.address.lng);
        // result.push(company);
        // console.log(lat2);
        // console.log(result);

        // result.push(company);

        return result;
      }, []);

      return companiesFinal;
    })
    .then((results) => {
      res.status(200).json({
        clients: results,
        totalItems: results.length,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editUser = async (req, res, next) => {
  const userId = req.params.userId;
  // const accountId = req.params.accountId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  let imageUrl = req.body.image;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phoneNumber = req.body.phoneNumber;
  const emergencyContactName = req.body.emergencyContactName;
  const emergencyContactNumber = req.body.emergencyContactNumber;
  const gender = req.body.gender;

  const password = req.body.password;
  const role = req.body.role;

  if (req.file) imageUrl = req.file.path;
  // if (!imageUrl) {
  //   const error = new Error("Image was not found, try again.");
  //   error.statusCode = 404;
  //   throw error;
  // }
  let accountId;

  await User.findById(userId).then((user) => {
    if (!user) {
      const error = new Error("Could not find any User with the given userId");
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

          Account.findById(user.account).then((fetchedAccount) => {
            if (!fetchedAccount) {
              const error = new Error(
                "Could not find any User with the given accountId"
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
          User.findById(userId)
            .then(async (fetchedUser) => {
              if (!fetchedUser) {
                const error = new Error(
                  "Could not find any User with the given userId"
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

              fetchedUser.firstName = firstName;
              fetchedUser.lastName = lastName;
              fetchedUser.phoneNumber = phoneNumber;
              fetchedUser.emergencyContactName = emergencyContactName;
              fetchedUser.emergencyContactNumber = emergencyContactNumber;
              fetchedUser.gender = gender;
              if (imageUrl) {
                fetchedUser.pic = urls;
              }

              return fetchedUser.save();
            })
            .then((updatedUser) => {
              res.status(200).json({
                message: "User info updated",
                user: updatedUser,
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

      Account.findById(user.account)
        .then((fetchedAccount) => {
          if (!fetchedAccount) {
            const error = new Error(
              "Could not find any User with the given accountId"
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
          User.findById(userId)
            .then(async (fetchedUser) => {
              if (!fetchedUser) {
                const error = new Error(
                  "Could not find any User with the given userId"
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

              fetchedUser.firstName = firstName;
              fetchedUser.lastName = lastName;
              fetchedUser.phoneNumber = phoneNumber;
              fetchedUser.emergencyContactName = emergencyContactName;
              fetchedUser.emergencyContactNumber = emergencyContactNumber;
              fetchedUser.gender = gender;
              if (imageUrl) {
                fetchedUser.pic = urls;
              }
              // fetchedEmployee.imageUrl = imageUrl;

              return fetchedUser.save();
            })
            .then((updatedUser) => {
              res.status(200).json({
                message: "User info updated",
                employee: updatedUser,
              });
            });
        })

        .catch((err) => {
          if (!err.statusCode) err.statusCode = 500;
          next(err);
        });
    }
  });
};
