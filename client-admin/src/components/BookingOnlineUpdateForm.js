import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import moment from "moment";
import { useForm, Form } from "./useForm";
import * as tripService from "../services/tripService";
import { useDispatch, useSelector } from "react-redux";
import {
  addBooking,
  editBooking,
  fetchBooking,
  fetchBookings,
  fetchTrip,
} from "../redux/actions/dataActions";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

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
  phoneNo: "",
  seatNumber: "",
  relativeName: "",
  relativePhone: "",
  quantity: "",
  trip: "",
};

export default function BookingOnlineUpdateForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  // const [loading, setLoading] = useState(true);
  const { loading } = useSelector((state) => state.data);
  const bookingsData = useSelector((state) => state.data.bookings);
  const tripsData = useSelector((state) => state.data.trips);
  const tripData = useSelector((state) => state.data.trip);
  // const trips = tripService.getAllDailyTrips();
  const [trips, setTrips] = useState([]);
  const { editOrAdd, recordForEdit } = props;

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
    // if ("phoneNo" in fieldValues)
    //   temp.phoneNo =
    //     fieldValues.phoneNo.length > 9 ? "" : "Minimum 10 numbers required.";
    if ("relativeName" in fieldValues)
      temp.relativeName = fieldValues.relativeName
        ? ""
        : "This field is required.";
    // if ("relativePhone" in fieldValues)
    //   temp.relativePhone =
    //     fieldValues.relativePhone.length > 9
    //       ? ""
    //       : "Minimum 10 numbers required.";
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
  // console.log(trips);

  // const handleSelectTrip = async (id) => {
  //   console.log(id);
  //   dispatch(fetchTrip(id));
  // };
  useEffect(() => {
    let newDate = new Date();
    newDate.setDate(newDate.getDate() - 1);

    const trs =
      tripsData?.trips &&
      tripsData.trips
        .filter(
          (daily) =>
            moment(daily.date).format("DD MMM, YYYY") >=
              moment(newDate).format("DD MMM, YYYY") &&
            daily.ticketsCount > 0 &&
            daily.tripType === "Scheduled"
        )
        .map((x) => x);

    setTrips([trs]);
  }, [tripsData]);

  // useEffect(() => {
  //   setTrips(tripsData?.trips);
  // }, [trips, setTrips, tripsData]);

  useEffect(() => {
    if (tripId) {
      dispatch(fetchTrip(tripId));
    }
  }, [tripId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    // const tprice = trips.filter((trips) => trips._id === values.trip).map((x) =>({
    //   ...x,
    // }))

    // const

    let totalPrice;
    let taxPrice;
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
            totalPrice = values.quantity * tripData.trip.fare;
            taxPrice = totalPrice * 0.05;
          }
          // console.log(totalPrice);
          // console.log(taxPrice);

          const bookingData = {
            name: values.name,
            email: values.email,
            phoneNo: values.phoneNo,
            relativeName: values.relativeName,
            seatNumber: values.seatNumber,
            relativePhone: values.relativePhone,
            quantity: values.quantity,
            trip: values.trip,
            taxPrice: taxPrice,
            totalPrice: totalPrice,
          };
          // console.log(loading);

          dispatch(editBooking(bookingData, recordForEdit._id));
          // dispatch(fetchBookings());
          // setLoading(false);

          // {
          loading === false && dispatch(fetchBookings());
          dispatch(fetchBookings());
          // editOrAdd(bookingData, resetForm);
          // localStorage.setItem("bookings", JSON.stringify([bookingsData.bookings]));
          // const bookingsda = JSON.parse(localStorage.getItem("bookings"));
          // const { bookings } = await bookingsda;

          // // console.log(loading);

          let countDownDate1 = new Date().getTime();
          let countDownDateSeconds1 =
            Math.floor((countDownDate1 % (1000 * 60)) / 1000) + 2;

          // update every second
          let x1 = setInterval(function () {
            // Get todays date and time
            let now1 = new Date().getTime();

            let nowSeconds1 = Math.floor((now1 % (1000 * 60)) / 1000);

            // find the distance between now and count down date
            let distance1 = countDownDateSeconds1 - nowSeconds1;

            if (distance1 < 0) {
              clearInterval(x1);
              setIsSuccessfull(false);
              editOrAdd(bookingData, resetForm);
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

  // console.log(values.trip);

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
            value={
              values.trips && values.trip == null
                ? (values.trip = values.trips[0].trip._id)
                : values.trip != ""
                ? (values.trip = values.trip)
                : (values.trip = "")
            }
            // onClick={() => handleSelectTrip(values.trip)}
            onChange={handleInputChange}
            options={trips[0]}
            error={errors.trip}
          />
          <Controls.Input
            style={{ maxWidth: "250px" }}
            label="Seat No."
            name="seatNumber"
            value={values.seatNumber}
            onChange={handleInputChange}
            // error={errors.email}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Quantity"
            name="quantity"
            value={
              values.trips && values.quantity == null
                ? (values.quantity = values.trips[0].quantity)
                : values.quantity != ""
                ? (values.quantity = values.quantity)
                : (values.quantity = "")
            }
            onChange={handleInputChange}
            error={errors.quantity}
          />
          <Controls.Input
            label="Name"
            name="name"
            value={
              values.user && values.name == null
                ? (values.name = values.user.name)
                : values.name != ""
                ? (values.name = values.name)
                : (values.name = "")
            }
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="Phone Number"
            name="phoneNo"
            value={
              values.user && values.phoneNo == null
                ? (values.phoneNo = values.user.phoneNo)
                : values.phoneNo != ""
                ? (values.phoneNo = values.phoneNo)
                : (values.phoneNo = "")
            }
            onChange={handleInputChange}
            error={errors.phoneNo}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Email"
            name="email"
            value={
              values.user && values.email == null
                ? (values.email = values.user.email)
                : values.email != ""
                ? (values.email = values.email)
                : (values.email = "")
            }
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Emergency Contact Name"
            name="relativeName"
            value={
              values.user && values.relativeName == null
                ? (values.relativeName = values.user.relativeName)
                : values.relativeName != ""
                ? (values.relativeName = values.relativeName)
                : (values.relativeName = "")
            }
            onChange={handleInputChange}
            error={errors.relativeName}
          />
          <Controls.Input
            label="Emergency Contact No."
            name="relativePhone"
            value={
              values.user && values.relativePhone == null
                ? (values.relativePhone = values.user.relativePhone)
                : values.relativePhone != ""
                ? (values.relativePhone = values.relativePhone)
                : (values.relativePhone = "")
            }
            onChange={handleInputChange}
            error={errors.relativePhone}
          />

          <div>
            <Controls.Button
              disabled={isSuccessfull}
              type="submit"
              text="Submit"
            />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
