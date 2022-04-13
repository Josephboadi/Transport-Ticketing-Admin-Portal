import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as vehicleService from "../services/vehicleService";
import * as employeeService from "../services/employeeService";
import {
  addPaymentAccount,
  addVehicle,
  fetchPaymentAccounts,
  fetchVehicles,
} from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

// const typeItems = [
//   { id: "bus", title: "Bus" },
//   { id: "train", title: "Train" },
//   { id: "other", title: "Other" },
// ];

// const getDriverCollection = [
//   { id: "joseph", title: "Joseph" },
//   { id: "yeboah", title: "Yeboah" },
//   { id: "boadi", title: "Boadi" },
//   { id: "ida", title: "Ida" },
// ];

const initialFValues = {
  id: 0,
  accountName: "",
  financialServiceName: "",
  accountNumber: "",
  // capacity: "",
  // driver: "",
};

// const initialImages = [];

export default function PaymentAccountForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  // const vehiclesData = useSelector((state) => state.data.vehicles);
  // const [drivers, setDrivers] = useState(employeeService.getAllDrivers());
  // const [driverId, setDriverId] = useState("");
  // const [vehicleName, setVehicleName] = useState("");
  // const [type, setType] = useState("bus");
  // const [regNumber, setRegNumber] = useState("");
  // const [capacity, setCapacity] = useState("");
  // const [type, setType] = useState("");
  // const [driver, setDriver] = useState("");
  // const [images, setImages] = useState([]);

  // const employeesData = useSelector((state) => state.data.employees);

  // const [drivers, setDrivers] = useState([]);

  // const drivers = employeeService.getAllDrivers();

  // console.log(drivers);

  // const handleFileSelect = (event) => {
  //   setImages(event.target.files);
  // };

  const { addOrEdit, editOrAdd, recordForEdit } = props;

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

    if ("accountName" in fieldValues)
      temp.accountName = fieldValues.accountName
        ? ""
        : "This field is required.";
    if ("financialServiceName" in fieldValues)
      temp.financialServiceName = fieldValues.financialServiceName
        ? ""
        : "This field is required.";
    if ("accountNumber" in fieldValues)
      temp.accountNumber = fieldValues.accountNumber
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    // handleFileSelect,
    resetForm,
  } = useForm(initialFValues, true, validate);

  // console.log(values.driver);

  // initialImages,
  // useEffect(() => {
  //   employeesData.employees &&
  //     employeesData.employees
  //       .filter((drivers) => drivers.account.role === "ROLE_DRIVER")
  //       .map((x) => setDrivers([x]));

  //   // console.log(drivers);
  // }, [employeesData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    if (validate()) {
      const paymentAccountData = {
        accountName: values.accountName,
        financialServiceName: values.financialServiceName,
        accountNumber: values.accountNumber,
      };
      dispatch(addPaymentAccount(paymentAccountData));

      {
        loading === false && dispatch(fetchPaymentAccounts());
        dispatch(fetchPaymentAccounts());
        // addOrEdit(paymentAccountData, resetForm);

        //   localStorage.setItem(
        //     "vehicles",
        //     JSON.stringify([vehiclesData.vehicles])
        //   );
        // const vehiclesda = JSON.parse(localStorage.getItem("vehicles"));
        // const { vehicles } = await vehiclesda;

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
            setIsSuccessfull(false);
            addOrEdit(paymentAccountData, resetForm);
          }
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      {/* <Grid container> */}
      {/* <Grid item xs={6}>
          <Controls.Input
            name="fullName"
            label="Vehicle Name"
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            // error={errors.fullName}
          />
          <Controls.Input
            name="regNumber"
            label="Registration Number"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
            // error={errors.regNumber}
          />
          <Controls.Input
            name="capacity"
            label="Vehicle Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            // error={errors.capacity}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="type"
            label="Vehicle Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={typeItems}
          />
          <Controls.Select
            name="driver"
            label="Driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            options={getDriverCollection}
            // error={errors.driver}
          /> */}

      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name="accountName"
            label="Account Name"
            value={values.accountName}
            onChange={handleInputChange}
            error={errors.accountName}
          />
          <Controls.Input
            label="Bank Name / Mobile Money Name"
            name="financialServiceName"
            value={values.financialServiceName}
            onChange={handleInputChange}
            error={errors.financialServiceName}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Account Number"
            name="accountNumber"
            value={values.accountNumber}
            onChange={handleInputChange}
            error={errors.accountNumber}
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
