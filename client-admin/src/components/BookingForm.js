import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import moment from "moment";
import { useForm, Form } from "./useForm";
import * as tripService from "../services/tripService";
import { useDispatch, useSelector } from "react-redux";
import {
  addBooking,
  fetchBooking,
  fetchBookings,
  fetchTrip,
} from "../redux/actions/dataActions";
import { Redirect } from "react-router";
import { logoutAction } from "../redux/actions/authActions";
import jwtDecode from "jwt-decode";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const tripsItem = [
  { id: "5788995546", title: "Sunyani - Accra" },
  { id: "4557899987", title: "Sumyani - Kumasi" },
  { id: "4566878995", title: "Accra - Kumasi" },
];

const initialFValues = {
  id: 0,
  email: "",
  name: "",
  seatNumber: "",
  phoneNo: "",
  relativeName: "",
  relativePhone: "",
  quantity: 1,
  trip: "",
};

export default function BookingForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const bookingsData = useSelector((state) => state.data.bookings);
  const tripsData = useSelector((state) => state.data.trips);
  // const tripsData = useSelector((state) => state.data.trips);
  const tripData = useSelector((state) => state.data.trip);
  // const trips = tripService.getAllDailyTrips();
  const [trips, setTrips] = useState([]);
  // const [tripId, setTripId] = useState(null);
  const { addOrEdit, recordForEdit } = props;

  const token = localStorage.jwt;

  // useEffect(() => {
  if (token) {
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    if (decodedToken.exp * 1000 < Date.now()) {
      dispatch(logoutAction());
      window.location.href = "/signin";
    }
  }
  // }, []);

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";
    if ("quantity" in fieldValues)
      temp.quantity = fieldValues.quantity ? "" : "This field is required.";
    // if ("email" in fieldValues)
    //   temp.email = /$^|.+@.+..+/.test(fieldValues.email)
    //     ? ""
    //     : "Email is not valid.";
    if ("phoneNo" in fieldValues)
      temp.phoneNo =
        fieldValues.phoneNo.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("relativeName" in fieldValues)
      temp.relativeName = fieldValues.relativeName
        ? ""
        : "This field is required.";
    if ("relativePhone" in fieldValues)
      temp.relativePhone =
        fieldValues.relativePhone.length > 9
          ? ""
          : "Minimum 10 numbers required.";
    if ("trip" in fieldValues)
      temp.trip = fieldValues.trip.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  let tripId;
  tripId = values.trip;

  // console.log(values);
  // let newDate = new Date();
  let newDate = Date.now();
  useEffect(() => {
    // let newDate = Date.now();
    // newDate.setDate(newDate.getDate() - 1);

    const trs =
      tripsData?.trips &&
      tripsData.trips
        .filter(
          (daily) =>
            // moment(daily.date).format("DD MMM, YYYY") >
            //   moment(newDate).format("DD MMM, YYYY") &&

            moment(daily.date).month() - moment(newDate).month() == 0 &&
            moment(daily.date).date() - moment(newDate).date() >= 0 &&
            // Date.now(daily.date) - newDate > 3 &&
            daily.ticketsCount > 0 &&
            daily.tripType === "Unscheduled"
        )
        .map((x) => x);

    setTrips([trs]);

    // setSchTrips(tripsData?.trips);
    // setTrips([tripsData?.trips]);
  }, [tripsData]);

  console.log(tripsData);

  // console.log(moment(tripsData.trips[0].date).date());
  // console.log(moment(tripsData.trips[0].date).month());
  // console.log(tripsData.trips[0].date);
  // console.log(moment(newDate).format("DD MMM, YYYY"));
  // console.log(moment(newDate).date());
  // console.log(moment(newDate).month());

  // console.log(

  //     moment(tripsData.trips[1].date).date() +
  //     moment(tripsData.trips[1].date).month()

  // );

  // console.log(moment(tripsData.trips[1].date).date() + moment(newDate).month());

  // console.log(moment(tripsData.trips[0].date).date() + moment(newDate).month());

  // console.log(moment(newDate).date() + moment(newDate).month());

  // console.log(newDate - tripsData.trips[0].date);

  useEffect(() => {
    if (tripId) {
      dispatch(fetchTrip(tripId));
    }
  }, [tripId]);
  // console.log(values.trip);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    // const tprice = trips.filter((trips) => trips._id === values.trip).map((x) =>({
    //   ...x,
    // }))

    // const tripId = values.trip;
    let totalPrice;
    let taxPrice;
    let seatNo;

    // dispatch(fetchTrip(tripId));

    let countDownDate = new Date().getTime();
    let countDownDateSeconds =
      Math.floor((countDownDate % (1000 * 60)) / 1000) + 1;

    // update every second
    let x = setInterval(function () {
      // Get todays date and time
      let now = new Date().getTime();

      let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

      // find the distance between now and count down date
      let distance = countDownDateSeconds - nowSeconds;

      if (distance < 0) {
        clearInterval(x);
        if (validate()) {
          // console.log(tripData);

          if (tripData.trip) {
            const ticketsCountRe = tripData.trip.ticketsCount - values.quantity;

            if (values.quantity > 1) {
              seatNo = `${
                tripData.trip.vehicle.capacity -
                ticketsCountRe -
                values.quantity +
                1
              } - ${tripData.trip.vehicle.capacity - ticketsCountRe}`;
            } else {
              seatNo =
                tripData.trip.vehicle.capacity -
                ticketsCountRe -
                values.quantity +
                1;
            }

            totalPrice = values.quantity * tripData.trip.fare;
            taxPrice = totalPrice * 0.05;
          }
          // console.log(totalPrice);

          const bookingData = {
            name: values.name,
            email: values.email,
            phoneNo: values.phoneNo,
            relativeName: values.relativeName,
            relativePhone: values.relativePhone,
            seatNumber: values.seatNumber,
            quantity: values.quantity,
            trip: values.trip,
            ticketId: Date.now()
              .toString()
              .substr(Date.now().toString().length - 8),
            // ticketId: `${tripId.substr(tripId.length - 10)}`,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
          };

          dispatch(addBooking(bookingData));
          // dispatch(fetchBookings());

          // {
          loading === false && dispatch(fetchBookings());
          // addOrEdit(bookingData, resetForm);
          dispatch(fetchBookings());

          //   localStorage.setItem(
          //     "bookings",
          //     JSON.stringify([bookingsData.bookings])
          //   );
          // const bookingsda = JSON.parse(localStorage.getItem("bookings"));
          // const { bookings } = await bookingsda;
          // // console.log(bookings);

          let countDownDate1 = new Date().getTime();
          let countDownDateSeconds1 =
            Math.floor((countDownDate1 % (1000 * 60)) / 1000) + 1;

          // update every second
          let x1 = setInterval(function () {
            // Get todays date and time
            let now1 = new Date().getTime();

            let nowSeconds1 = Math.floor((now1 % (1000 * 60)) / 1000);

            // find the distance between now and count down date
            let distance1 = countDownDateSeconds1 - nowSeconds1;

            if (distance1 < 0) {
              clearInterval(x1);
              // console.log(seatNo);
              // setIsSuccessfull(false);
              addOrEdit(bookingData, seatNo, tripData, resetForm);
            }
          }, 1000);
          // }
          // }
        }
      }
    }, 1000);

    // console.log(tripData);
    // const totalPrice = values.quantity * tprice[0].fare
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{ display: "flex", flexDirection: "row", maxWidth: "836px" }}>
          <Controls.TripSelect
            name="trip"
            label="Trip"
            value={values.trip}
            onChange={handleInputChange}
            options={trips[0]}
            error={errors.trip}
          />
          <Controls.Input
            style={{ maxWidth: "250px" }}
            label="Seat Number"
            name="seatNumber"
            value={values.seatNumber}
            onChange={handleInputChange}
            // error={errors.seatNumber}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Quantity"
            name="quantity"
            value={values.quantity}
            onChange={handleInputChange}
            error={errors.quantity}
          />
          <Controls.Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="Phone Number"
            name="phoneNo"
            value={values.phoneNo}
            onChange={handleInputChange}
            error={errors.phoneNo}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Emergency Contact Name"
            name="relativeName"
            value={values.relativeName}
            onChange={handleInputChange}
            error={errors.relativeName}
          />
          <Controls.Input
            label="Emergency Contact No."
            name="relativePhone"
            value={values.relativePhone}
            onChange={handleInputChange}
            error={errors.relativePhone}
          />

          <div>
            <Controls.Button disabled={loading} type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
