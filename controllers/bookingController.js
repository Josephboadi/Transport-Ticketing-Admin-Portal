const path = require("path");
// const fs = require("fs");

const { validationResult } = require("express-validator");

const Booking = require("../models/booking");
const Trip = require("../models/trip");
const Company = require("../models/company");
const Account = require("../models/account");
const cloudinary = require("../middleware/cloudinary");

exports.createBooking = async (req, res, next) => {
  const taxPrice = req.body.taxPrice;
  const email = req.body.email;
  const name = req.body.name;
  const phoneNo = req.body.phoneNo;
  const seatNumber = req.body.seatNumber;
  const relativeName = req.body.relativeName;
  const relativePhone = req.body.relativePhone;
  const totalPrice = req.body.totalPrice;
  const ticketId = req.body.ticketId;
  const paymentType = "Cash";
  const isPaid = true;
  const quantity = req.body.quantity;
  const trip = req.body.trip;

  let trips;
  let seatNo;

  await Trip.findById(trip)
    .populate("vehicle")
    .then((trip) => {
      if (!trip) {
        const error = new Error(
          "Could not find any Trip with the given tripId"
        );
        error.statusCode = 404;
        throw error;
      }

      trip.ticketsCount = trip.ticketsCount - quantity;
      trip.save();

      trips = {
        quantity: quantity,
        trip,
      };

      if (quantity > 1) {
        seatNo = `${
          trip.vehicle.capacity - trip.ticketsCount - quantity + 1
        } - ${trip.vehicle.capacity - trip.ticketsCount}`;
      } else {
        seatNo = trip.vehicle.capacity - trip.ticketsCount - quantity + 1;
      }
      // res
      //   .status(200)
      //   .json({ message: "Trip fetched successfully", trip: tripDetail });
    });

  // const id = req.body.id;
  // const status = req.body.status;
  // const update_time = req.body.update_time;
  // const email_address = req.body.email_address;

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
  let empaccountObj;
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      // console.log(account);
      accountObj = account;
      if (account) {
        return await Company.findOne({ account: account._id }).populate({
          path: "branches",
          model: "CompanyBranch",
        });
      } else {
        // console.log(req.accountDetail);
        return await Company.findById(req.loggedInUserId).populate({
          path: "branches",
          model: "CompanyBranch",
        });
      }
    })

    .then((result) => {
      // console.log(result);
      let userDetail;
      if (accountObj) {
        userDetail = {
          // email: accountObj.email,
          // name: result.name,
          email: email,
          phoneNo: phoneNo,
          name: name,
          relativeName: relativeName,
          relativePhone: relativePhone,
          // address: result.address,
          userId: result._id,
        };
      } else {
        userDetail = {
          // email: req.accountDetail.email,
          email: email,
          phoneNo: phoneNo,
          // email: result.email,
          // name: req.accountDetail.name,
          name: name,
          relativeName: relativeName,
          relativePhone: relativePhone,
          // address: result.address,
          userId: req.accountDetail.empId,
        };
      }
      let seatNum;
      if (seatNumber) {
        seatNum = seatNumber;
      } else {
        seatNum = seatNo;
      }
      // console.log(userDetail);
      const bookingDetail = new Booking({
        taxPrice: taxPrice,
        totalPrice: totalPrice,
        paymentType: paymentType,
        ticketId: ticketId,
        seatNumber: seatNum,
        // paymentResult: {
        //   id: id,
        //   status: status,
        //   update_time: update_time,
        //   email_address: email_address,
        // },
        isPaid: isPaid,
        user: userDetail,
        trips: trips,
        status: "Booked",
        company: {
          name: result.name,
          phone: result.branches[0].address.phoneNo,
          imageUrl: result.imageUrl[0].img,
          companyId: result._id,
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
    })

    // return result;

    .then((result) => {
      res.status(200).json({ message: "booked successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

// exports.createVehicle = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error("Validation Failed, Incorrect data entered.");
//     error.statusCode = 422;
//     error.errors = errors.array();
//     throw error;
//   }

//   if (!req.files) {
//     const error = new Error("Upload an image as well.");
//     error.statusCode = 422;
//     throw error;
//   }

//   let imageUrl = [];
//   let urls = [];

//   if (req.files.length > 0) {
//     try {
//       const files = req.files;
//       for (const file of files) {
//         const { path } = file;
//         const newPath = await cloudinary.uploader.upload(path);
//         urls.push(newPath);

//         imageUrl = urls.map((url) => {
//           return { img: url.secure_url };
//         });
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // const imageUrl = req.file.path;
//   const name = req.body.name;
//   const type = req.body.type;
//   const regNumber = req.body.regNumber;
//   const capacity = req.body.capacity;
//   const driver = req.body.driver;
//   let creator;

//   Account.findById(req.loggedInUserId)
//     .then(async (account) => {
//       if (account) {
//         return await Company.findOne({ account: account._id });
//       } else {
//         return await Company.findById(req.loggedInUserId);
//       }
//     })
//     .then((company) => {
//       creator = company;

//       const vehicle = new Vehicle({
//         name: name,
//         type: type,
//         imageUrl: imageUrl,
//         regNumber: regNumber,
//         capacity: capacity,
//         driver: driver,
//         creator: creator._id,
//       });

//       vehicle
//         .save()
//         .then((savedVehicle) => {
//           company.vehicles.push(vehicle);
//           return company.save();
//         })
//         .then((updatedCompany) => {
//           res.status(201).json({
//             message: "Vehicle created, Successfully!",
//             vehicle: vehicle,
//             creator: { _id: creator._id, name: creator.name },
//           });
//         });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

exports.deleteBooking = (req, res, next) => {
  const bookingId = req.params.bookingId;
  Booking.findById(bookingId)
    .then(async (booking) => {
      if (!booking) {
        const error = new Error(
          "Could not find any booking with the given bookingId"
        );
        error.statusCode = 404;
        throw error;
      }

      await Trip.findById(booking.trips[0].trip).then((trip) => {
        if (!trip) {
          const error = new Error(
            "Could not find any Trip with the given tripId"
          );
          error.statusCode = 404;
          throw error;
        }

        trip.ticketsCount = trip.ticketsCount + booking.trips[0].quantity;
        trip.save();

        // trips = {
        //   quantity: quantity,
        //   trip,
        // };
        // res
        //   .status(200)
        //   .json({ message: "Trip fetched successfully", trip: tripDetail });
      });

      return Booking.findByIdAndRemove(bookingId);
    })

    .then((result) => {
      res.status(200).json({
        message: "Booking deleted successfully.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.editBooking = async (req, res, next) => {
  const bookingId = req.params.bookingId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed, Incorrect data entered.");
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }

  const taxPrice = req.body.taxPrice;
  const email = req.body.email;
  const name = req.body.name;
  const phoneNo = req.body.phoneNo;
  const seatNumber = req.body.seatNumber;
  const relativeName = req.body.relativeName;
  const relativePhone = req.body.relativePhone;
  const totalPrice = req.body.totalPrice;
  const paymentType = "Cash";
  const isPaid = true;
  const quantity = req.body.quantity;
  const trip = req.body.trip;
  let trips;

  let accountObj;
  let empaccountObj;
  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      // console.log(account);
      accountObj = account;
      if (account) {
        return await Company.findOne({ account: account._id });
      } else {
        // console.log(req.accountDetail);
        return await Company.findById(req.loggedInUserId);
      }
    })

    .then((result) => {
      // console.log(result);
      let userDetail;
      if (accountObj) {
        userDetail = {
          // email: accountObj.email,
          // name: result.name,
          email: email,
          phoneNo: phoneNo,
          name: name,
          relativeName: relativeName,
          relativePhone: relativePhone,
          // address: result.address,
          userId: result._id,
        };
      } else {
        userDetail = {
          // email: req.accountDetail.email,
          email: email,
          phoneNo: phoneNo,
          // email: result.email,
          // name: req.accountDetail.name,
          name: name,
          relativeName: relativeName,
          relativePhone: relativePhone,
          // address: result.address,
          userId: req.accountDetail.empId,
        };
      }

      Booking.findById(bookingId).then(async (fetchedBooking) => {
        if (!fetchedBooking) {
          const error = new Error(
            "Could not find any Booking with the given bookingId"
          );
          error.statusCode = 404;
          throw error;
        }

        await Trip.findById(trip).then((trip) => {
          if (!trip) {
            const error = new Error(
              "Could not find any Trip with the given tripId"
            );
            error.statusCode = 404;
            throw error;
          }

          trip.ticketsCount =
            fetchedBooking.trips[0].quantity + trip.ticketsCount - quantity;
          trip.save();

          trips = {
            quantity: quantity,
            trip,
          };
          // res
          //   .status(200)
          //   .json({ message: "Trip fetched successfully", trip: tripDetail });
        });
        fetchedBooking.seatNumber = seatNumber;
        fetchedBooking.user = userDetail;
        fetchedBooking.taxPrice = taxPrice;
        fetchedBooking.totalPrice = totalPrice;
        fetchedBooking.paymentType = paymentType;
        fetchedBooking.isPaid = isPaid;
        fetchedBooking.trips = trips;

        return fetchedBooking.save();
      });
    })
    .then((updatedBooking) => {
      res.status(200).json({
        message: "Booking updated",
        booking: updatedBooking,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getBookings = (req, res, next) => {
  // const authHeader = req.get("Authorization");
  // if (!authHeader) {
  //   const error = new Error("Not authenticated");
  //   error.statusCode = 401;
  //   throw error;
  // }

  // const token = authHeader.split(" ")[1];
  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, JWT_SECRETE);
  // } catch (err) {
  //   err.statusCode = 500;
  //   throw err;
  // }
  // if (!decodedToken) {
  //   const error = new Error("Not authenticated");
  //   error.statusCode = 401;
  //   throw error;
  // }

  // const accountId = decodedToken.accountId;

  Account.findById(req.loggedInUserId)
    .then(async (account) => {
      // console.log(account);
      if (account) {
        return Company.findOne({ account: account._id });
      } else {
        await Company.findById(req.loggedInUserId)
          .then((result) => {
            // console.log(result);
            if (result instanceof Company)
              return Booking.find({ "company.companyId": result._id })
                .populate({
                  path: "trips.trip",
                  model: "Trip",
                })
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
                .sort({
                  createdAt: -1,
                });
            // return res.json({ result, empDet: account });
          })
          .then((bookings) => {
            res.status(200).json({ bookings, empDet: req.accountDetail });
          });
      }
    })
    .then((result) => {
      // console.log(result);

      if (result instanceof Company)
        return Booking.find({ "company.companyId": result._id })
        .populate({
                  path: "trips.trip",
                  model: "Trip",
                })
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
          .sort({
            createdAt: -1,
          });
    })
    .then((bookings) => {
      // if (result instanceof Company)
      res.status(200).json({ bookings });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;
      next(err);
    });
};

exports.getBooking = (req, res, next) => {
  // const authHeader = req.get("Authorization");
  // if (!authHeader) {
  //   const error = new Error("Not authenticated");
  //   error.statusCode = 401;
  //   throw error;
  // }

  // const token = authHeader.split(" ")[1];
  // let decodedToken;
  // try {
  //   decodedToken = jwt.verify(token, JWT_SECRETE);
  // } catch (err) {
  //   err.statusCode = 500;
  //   throw err;
  // }
  // if (!decodedToken) {
  //   const error = new Error("Not authenticated");
  //   error.statusCode = 401;
  //   throw error;
  // }

  // const accountId = decodedToken.accountId;

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

// exports.getBookings = (req, res, next) => {
//   Account.findById(req.loggedInUserId)
//     .then(async (account) => {
//       if (account) {
//         return await Company.findOne({ account: account._id });
//       } else {
//         return await Company.findById(req.loggedInUserId);
//       }
//     })
//     .then((company) => {
//       return Vehicle.find({ _id: { $in: company.vehicles } });
//     })
//     .then((vehicles) => {
//       res.json({ vehicles: vehicles });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

// exports.getVehicle = (req, res, next) => {
//   const vehicleId = req.params.vehicleId;
//   Vehicle.findById(vehicleId)
//     .then((vehicle) => {
//       if (!vehicle) {
//         const error = new Error(
//           "Could not find any Vehicle with the given vehicleId"
//         );
//         error.statusCode = 404;
//         throw error;
//       }
//       res
//         .status(200)
//         .json({ message: "Vehicle fetched successfully", vehicle: vehicle });
//     })
//     .catch((err) => {
//       if (!err.statusCode) err.statusCode = 500;
//       next(err);
//     });
// };

// const clearImage = (filepath) => {
//   filepath = path.join(__dirname, "../", filepath);
//   fs.unlink(filepath, (err) => {
//     console.log(err);
//   });
// };
