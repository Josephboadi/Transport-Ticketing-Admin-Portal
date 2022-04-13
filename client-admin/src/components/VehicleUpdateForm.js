import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as vehicleService from "../services/vehicleService";
import * as employeeService from "../services/employeeService";
import { editVehicle, fetchVehicles } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import DriverSelect from "./controls/DriverSelect";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

const typeItems = [
  { id: "bus", title: "Bus" },
  { id: "train", title: "Train" },
  { id: "other", title: "Other" },
];

const getDriverCollection = [
  { id: "joseph", title: "Joseph" },
  { id: "yeboah", title: "Yeboah" },
  { id: "boadi", title: "Boadi" },
  { id: "ida", title: "Ida" },
];

const initialFValues = {
  id: 0,
  name: "",
  type: "Bus",
  regNumber: "",
  capacity: "",
  driverName: "",
};

// const initialImages = [];

export default function VehicleUpdateForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const vehiclesData = useSelector((state) => state.data.vehicles);
  // const [vehicleName, setVehicleName] = useState("");
  const [type, setType] = useState("bus");

  // const [regNumber, setRegNumber] = useState("");
  // const [capacity, setCapacity] = useState("");
  // const [type, setType] = useState("");
  // const [driver, setDriver] = useState("");
  const [images, setImages] = useState([]);

  const employeesData = useSelector((state) => state.data.employees);

  const [drivers, setDrivers] = useState([]);

  // const drivers = employeeService.getAllDrivers();

  const handleFileSelect = (event) => {
    setImages(event.target.files);
  };

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
    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required.";

    if ("regNumber" in fieldValues)
      temp.regNumber = fieldValues.regNumber ? "" : "This field is required.";
    if ("capacity" in fieldValues)
      temp.capacity = fieldValues.capacity ? "" : "This field is required.";
    if ("driverName" in fieldValues)
      temp.driverName = fieldValues.driverName ? "" : "This field is required.";

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

  useEffect(() => {
    const drivs =
      employeesData.employees &&
      employeesData.employees
        .filter((drivers) => drivers.account.role === "ROLE_DRIVER")
        .map((x) => x);

    setDrivers([drivs]);

    // console.log(drivers);
  }, [employeesData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    if (validate()) {
      const vehicleData = new FormData();
      for (let i = 0; i < images.length; i++) {
        vehicleData.append("images", images[i]);
      }
      vehicleData.append("name", values.name);
      vehicleData.append("regNumber", values.regNumber);
      vehicleData.append("capacity", values.capacity);
      vehicleData.append("type", values.type);
      vehicleData.append("driver", values.driverName);
      dispatch(editVehicle(vehicleData, recordForEdit._id));

      // {
      loading === false && dispatch(fetchVehicles());
      dispatch(fetchVehicles());
      // editOrAdd(vehicleData, resetForm);
      //     localStorage.setItem(
      //       "vehicles",
      //       JSON.stringify([vehiclesData.vehicles])
      //     );
      //   const vehiclesda = JSON.parse(localStorage.getItem("vehicles"));
      //   const { vehicles } = await vehiclesda;

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
          editOrAdd(vehicleData, resetForm);
        }
      }, 1000);
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
            name="name"
            label="Vehicle Name"
            value={values.name}
            onChange={handleInputChange}
            error={errors.name}
          />
          <Controls.Input
            label="Registration Number"
            name="regNumber"
            value={values.regNumber}
            onChange={handleInputChange}
            error={errors.regNumber}
          />
          <Controls.Input
            label="Vehicle Capacity"
            name="capacity"
            value={values.capacity}
            onChange={handleInputChange}
            error={errors.capacity}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            name="type"
            label="Vehicle Type"
            value={type}
            onChange={handleInputChange}
            // onChange={(e) => setType(e.target.value)}
            options={typeItems}
          />
          <Controls.DriverSelect
            name="driverName"
            label="Driver"
            value={
              values.driver && values.driverName == null
                ? (values.driverName = values.driver._id)
                : values.driverName != ""
                ? (values.driverName = values.driverName)
                : (values.driverName = "")
            }
            onChange={handleInputChange}
            // onChange={(e) => setDriver(e.target.value)}
            options={drivers[0]}
            error={errors.driver}
          />
          <Typography
            variant="body2"
            component="p"
            style={{ margin: "10px 10px 2px 10px" }}>
            Upload Images:
          </Typography>
          <input
            accept="image/*"
            // className={classes.uploadImages}
            style={{ margin: "10px", fontSize: "16px" }}
            // style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileSelect}
          />
          {/* {imageError && (
            <Typography
              variant="body2"
              component="p"
              style={{ margin: "4px 10px 2px 10px", color: "#f44336" }}>
              Upload an Image as well
            </Typography>
          )} */}

          {/* <Controls.DropArea onChange={handleFileSelect} /> */}

          <div>
            <Controls.Button disabled={loading} type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
