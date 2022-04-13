import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as employeeService from "../services/employeeService";
import * as vehicleService from "../services/vehicleService";
import * as branchService from "../services/branchService";
import * as locationService from "../services/locationService";
import { editTrip, fetchTrips } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import Vehicles from "../pages/Employees";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

const locationItems = [
  { id: "Sunyani", title: "Sunyani" },
  { id: "Kumasi", title: "Kumasi" },
  { id: "Accra", title: "Accra" },
];

const statusRadio = [
  { id: "LOADING", title: "Loading" },
  { id: "STARTED", title: "Started" },
  { id: "COMPLETED", title: "Completed" },
];

const tripTypeRadio = [
  { id: "Scheduled", title: "Scheduled" },
  { id: "Unscheduled", title: "Unscheduled" },
];

const driversItems = [
  { id: "1", title: "Samuel" },
  { id: "2", title: "Hannah" },
  { id: "3", title: "Joseph" },
  { id: "4", title: "Ida" },
];

const vehiclesItems = [
  { id: "1", title: "VIP Bus 1" },
  { id: "2", title: "VIP Bus 2" },
  { id: "3", title: "VIP Bus 3" },
];

const initialFValues = {
  id: 0,
  departLoc: "",
  destLoc: "",
  date: new Date(),
  time: "",
  fare: 0,
  ticketsCount: 45,
  vehicleName: "",
  branchName: "",
  status: "LOADING",
  tripType: "Scheduled",
};

export default function TripUpdateForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const tripsData = useSelector((state) => state.data.trips);
  const vehiclesData = useSelector((state) => state.data.vehicles);
  const branchesData = useSelector((state) => state.data.branches);
  const locationsData = useSelector((state) => state.data.locations);
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]);
  const [locations, setLocations] = useState([]);

  // const vehicles = vehicleService.getAllVehicles();
  // const branches = branchService.getAllBranches();
  // const locations = locationService.getAllLocations();

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

    if ("departLoc" in fieldValues)
      temp.departLoc =
        fieldValues.departLoc.length != 0 ? "" : "This field is required.";
    if ("destLoc" in fieldValues)
      temp.destLoc =
        fieldValues.destLoc.length != 0 ? "" : "This field is required.";
    if ("fare" in fieldValues)
      temp.fare = fieldValues.fare ? "" : "This field is required.";
    if ("ticketsCount" in fieldValues)
      temp.ticketsCount = fieldValues.ticketsCount
        ? ""
        : "This field is required.";
    if ("vehicleName" in fieldValues)
      temp.vehicleName =
        fieldValues.vehicleName.length != 0 ? "" : "This field is required.";
    if ("branchName" in fieldValues)
      temp.branchName =
        fieldValues.branchName.length != 0 ? "" : "This field is required.";
    // if ("driver" in fieldValues)
    //   temp.driver =
    //     fieldValues.driver.length != 0 ? "" : "This field is required.";
    // if ("status" in fieldValues)
    // temp.status = fieldValues.status ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // console.log(locations);
  // console.log(values.departLoc);
  // console.log(values.destLoc);
  // console.log(values.vehicleName);

  useEffect(() => {
    setVehicles(vehiclesData?.vehicles);
  }, [vehicles, setVehicles, vehiclesData]);

  useEffect(() => {
    setBranches(branchesData?.branches);
  }, [branches, setBranches, branchesData]);

  useEffect(() => {
    setLocations(locationsData?.locations);
  }, [locations, setLocations, locationsData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    if (validate()) {
      const tripData = {
        from: values.departLoc,
        to: values.destLoc,
        date: values.date,
        time: values.time,
        fare: values.fare,
        ticketsCount: values.ticketsCount,
        vehicle: values.vehicleName,
        tripType: values.tripType,
        branch: values.branchName,
        status: values.status,
      };

      dispatch(editTrip(tripData, recordForEdit._id));

      // {
      loading === false && dispatch(fetchTrips());
      dispatch(fetchTrips());
      // editOrAdd(tripData, resetForm);
      //     localStorage.setItem("trips", JSON.stringify([tripsData.trips]));
      //   const tripsda = JSON.parse(localStorage.getItem("trips"));
      //   const { trips } = await tripsda;

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
          editOrAdd(tripData, resetForm);
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

  console.log(values.date);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.LocationSelect
            name="departLoc"
            label="Departure Location"
            value={
              values.from && values.departLoc == null
                ? (values.departLoc = values.from._id)
                : values.departLoc != ""
                ? (values.departLoc = values.departLoc)
                : (values.departLoc = "")
            }
            // options={locationItems}
            options={locations}
            onChange={handleInputChange}
            error={errors.from}
          />
          <Controls.LocationSelect
            label="Destination Location"
            name="destLoc"
            value={
              values.to && values.destLoc == null
                ? (values.destLoc = values.to._id)
                : values.destLoc != ""
                ? (values.destLoc = values.destLoc)
                : (values.destLoc = "")
            }
            // options={locationItems}
            options={locations}
            onChange={handleInputChange}
            error={errors.to}
          />
          <Controls.RadioGroup
            name="tripType"
            label="Trip Type"
            value={values.tripType}
            onChange={handleInputChange}
            items={tripTypeRadio}
          />
          <Grid container>
            <Grid item xs={6}>
              <Controls.DatePicker
                name="date"
                label="Departure Date"
                value={values.date}
                onChange={handleInputChange}
              />
            </Grid>
            {values.tripType === "Scheduled" && (
              <Grid item xs={4}>
                <Controls.TimePicker1
                  label="Departure Time"
                  name="time"
                  value={values.time}
                  // defaultValue={values.hireTime}
                  onChange={handleInputChange}
                  // error={errors.mobile}
                />
              </Grid>
            )}
          </Grid>
          <Controls.Input
            label="Ticket Price"
            name="fare"
            value={values.fare}
            onChange={handleInputChange}
            error={errors.fare}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Total Tickets"
            name="ticketsCount"
            value={values.ticketsCount}
            onChange={handleInputChange}
          />
          <Controls.VehicleSelect
            name="vehicleName"
            label="Vehicles"
            value={
              values.vehicle && values.vehicleName == null
                ? (values.vehicleName = values.vehicle._id)
                : values.vehicleName != ""
                ? (values.vehicleName = values.vehicleName)
                : (values.vehicleName = "")
            }
            onChange={handleInputChange}
            // options={vehiclesItems}
            options={vehicles}
            error={errors.vehicle}
          />
          <Controls.BranchSelect
            name="branchName"
            label="Boarding Point"
            value={
              values.branch && values.branchName == null
                ? (values.branchName = values.branch._id)
                : values.branchName != ""
                ? (values.branchName = values.branchName)
                : (values.branchName = "")
            }
            onChange={handleInputChange}
            options={branches}
            error={errors.branch}
          />
          <Controls.RadioGroup
            name="status"
            label="Status"
            value={values.status}
            onChange={handleInputChange}
            items={statusRadio}
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
