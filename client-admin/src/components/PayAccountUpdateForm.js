import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as vehicleService from "../services/vehicleService";
import * as employeeService from "../services/employeeService";
import {
  editPayAccount,
  editVehicle,
  fetchPaymentAccounts,
  fetchVehicles,
} from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import DriverSelect from "./controls/DriverSelect";
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
  privateId: "",
  publicId: "",
};

// const initialImages = [];

export default function PaymentAccountUpdateForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  // const vehiclesData = useSelector((state) => state.data.vehicles);
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
    if ("privateId" in fieldValues)
      temp.privateId = fieldValues.privateId ? "" : "This field is required.";
    if ("publicId" in fieldValues)
      temp.publicId = fieldValues.publicId ? "" : "This field is required.";

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

  // initialImages,

  // console.log(values);

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

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
      const payAccountData = {
        privateId: values.privateId,
        publicId: values.publicId,
      };
      dispatch(editPayAccount(payAccountData, recordForEdit._id));

      // {
      loading === false && dispatch(fetchPaymentAccounts());
      editOrAdd(payAccountData, resetForm);
      //     localStorage.setItem(
      //       "vehicles",
      //       JSON.stringify([vehiclesData.vehicles])
      //     );
      //   const vehiclesda = JSON.parse(localStorage.getItem("vehicles"));
      //   const { vehicles } = await vehiclesda;

      // let countDownDate = new Date().getTime();
      // let countDownDateSeconds =
      //   Math.floor((countDownDate % (1000 * 60)) / 1000) + 4;

      // // update every second
      // let x = setInterval(function () {
      //   // Get todays date and time
      //   let now = new Date().getTime();

      //   let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

      //   // find the distance between now and count down date
      //   let distance = countDownDateSeconds - nowSeconds;

      //   if (distance < 0) {
      //     clearInterval(x);
      //     setIsSuccessfull(false);
      //     editOrAdd(vehicleData, resetForm);
      //   }
      // }, 1000);
      // }
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
            name="privateId"
            label="Private Id"
            value={values.privateId}
            onChange={handleInputChange}
            error={errors.privateId}
          />
          {/* <Controls.Input
            label="Bank Name / Mobile Money Name"
            name="financialServiceName"
            value={values.financialServiceName}
            onChange={handleInputChange}
            error={errors.financialServiceName}
          /> */}
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Public Id"
            name="publicId"
            value={values.publicId}
            onChange={handleInputChange}
            error={errors.publicId}
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
