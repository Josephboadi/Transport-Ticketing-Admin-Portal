const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default:
        "https://res.cloudinary.com/dblprzex8/image/upload/v1604333253/profile1_dbycgc.png",
      // default: "no photo",
    },

    phoneNumber: {
      type: Number,
    },
    gender: {
      type: String,
    },
    account: { type: Schema.Types.ObjectId, required: true, ref: "Account" },

    creator: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

// userSchema.methods.addToCart = function ({ trip, quantity }) {
//   const cartTripIndex = this.cart.trips.findIndex((cp) => {
//     return cp.tripId.toString() === trip._id.toString();
//   });
//   // let newQuantity = 1;
//   const updatedCartTrips = [...this.cart.trips];

//   if (cartTripIndex >= 0) {
//     quantity = quantity;
//     // newQuantity = this.cart.trips[cartTripIndex].quantity + 1;
//     updatedCartTrips[cartTripIndex].quantity = quantity;
//   } else {
//     updatedCartTrips.push({
//       tripId: trip._id,
//       quantity: quantity,
//       // quantity: newQuantity,
//     });
//   }
//   const updatedCart = {
//     trips: updatedCartTrips,
//   };
//   this.cart = updatedCart;
//   return this.save();
// };

// userSchema.methods.reduceQuantity = function (tripId) {
//   const newCart = this.cart.trips.map((trip) => {
//     if (trip.tripId.toString() === tripId.toString())
//       return {
//         ...trip.toObject(),
//         quantity: trip.quantity - 1,
//       };
//     return trip.toObject();
//   });
//   const finalNewCart = newCart.filter((trip) => {
//     return trip.quantity > 0;
//   });
//   this.cart.trips = finalNewCart;
//   return this.save();
// };

// userSchema.methods.removeFromCart = function (tripId) {
//   const updatedCartTrips = this.cart.trips.filter((trip) => {
//     return trip.tripId.toString() !== tripId.toString();
//   });
//   this.cart.trips = updatedCartTrips;
//   return this.save();
// };

// userSchema.methods.clearCart = function () {
//   this.cart = { trips: [] };
//   return this.save();
// };

module.exports = mongoose.model("Employee", employeeSchema);
