import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as vehicleService from "../services/vehicleService";
import * as employeeService from "../services/employeeService";
import {
  addBranch,
  addVehicle,
  fetchBranches,
  fetchVehicles,
} from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  // rootHome: {
  //   padding: "2px 4px",
  //   display: "flex",
  //   alignItems: "center",
  //   width: 860,
  // },
  // rootItems: {
  //   padding: "2px 4px",
  //   display: "flex",
  //   alignItems: "center",
  //   width: 400,
  //   backgroundColor: "#edebeb",
  // },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    position: "relative",
    color: "#212121",
    width: "80%",
    height: "55px",
    // background: "transparent",
    padding: "5px 9px",
    marginTop: "8px",
    // outline: "none",
    // border: "none",
    border: "1px solid #C4C4C4",
    // borderBottom: "2px solid #2874f0",
    borderRadius: "4px",
  },
  results: {
    position: "absolute",
    marginRight: "10px",
    marginLeft: "10px",
    bottom: 40,
    left: "26%",
    zIndex: 999,
    // maxWidth: 760,
    width: "auto",
    left: "auto",
    right: "auto",
    // marginRight: "auto",
    // marginLeft: "auto",
    height: "15%",
  },
  iconButton: {
    padding: 10,
    color: "white",
  },
  // divider: {
  //   height: 28,
  //   margin: 4,
  // },
}));

const regionItems = [
  { id: "Upper East", title: "Upper East" },
  { id: "Upper West", title: "Upper West" },
  { id: "North East", title: "North East" },
  { id: "Savannah", title: "Savannah" },
  { id: "Northern", title: "Northern" },
  { id: "Brong Ahafo", title: "Brong Ahafo" },
  { id: "Bono East", title: "Bono East" },
  { id: "Ahafo", title: "Ahafo" },
  { id: "Ashanti", title: "Ashanti" },
  { id: "Oti", title: "Oti" },
  { id: "Volta", title: "Volta" },
  { id: "Western North", title: "Western North" },
  { id: "Western", title: "Western" },
  { id: "Central", title: "Central" },
  { id: "Eastern", title: "Eastern" },
  { id: "Greater Accra", title: "Greater Accra" },
];

const capitalItems = [
  { id: "Bolgatanga", title: "Bolgatanga" },
  { id: "Wa", title: "Wa" },
  { id: "Nalerigu", title: "Nalerigu" },
  { id: "Damango", title: "Damango" },
  { id: "Tamale", title: "Tamale" },
  { id: "Sunyani", title: "Sunyani" },
  { id: "Techiman", title: "Techiman" },
  { id: "Ahafo Goaso", title: "Ahafo Goaso" },
  { id: "Kumasi", title: "Kumasi" },
  { id: "Dambai", title: "Dambai" },
  { id: "Ho", title: "Ho" },
  { id: "Sefwi Wiawso", title: "Sefwi Wiawso" },
  { id: "Sekondi Takoradi", title: "Sekondi Takoradi" },
  { id: "Cape Coast", title: "Cape Coast" },
  { id: "Koforidua", title: "Koforidua" },
  { id: "Accra", title: "Accra" },
];

const initialFValues = {
  id: 0,
  branchName: "",
  phoneNo: "233",
  region: "",
  // formattedAddress: "",
  // lat: "",
  // lng: "",
  city: "",
  zip: "233",
};

// const initialImages = [];

export default function BranchForm(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const branchesData = useSelector((state) => state.data.branches);

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");

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
    if ("branchName" in fieldValues)
      temp.branchName = fieldValues.branchName ? "" : "This field is required.";
    if ("phoneNo" in fieldValues)
      temp.phoneNo =
        fieldValues.phoneNo.length > 9 ? "" : "Minimum 10 numbers required.";
    // if ("region" in fieldValues)
    //   temp.region = fieldValues.region ? "" : "This field is required.";

    if ("region" in fieldValues)
      temp.region =
        fieldValues.region.length != 0 ? "" : "This field is required.";
    // if ("formattedAddress" in fieldValues)
    //   temp.formattedAddress = fieldValues.formattedAddress ? "" : "This field is required.";
    // if ("lat" in fieldValues)
    //   temp.lat = fieldValues.lat ? "" : "This field is required.";
    // if ("lng" in fieldValues)
    //   temp.lng = fieldValues.lng ? "" : "This field is required.";
    // if ("city" in fieldValues)
    //   temp.city = fieldValues.city ? "" : "This field is required.";

    if ("city" in fieldValues)
      temp.city = fieldValues.city.length != 0 ? "" : "This field is required.";

    if ("zip" in fieldValues)
      temp.zip = fieldValues.zip ? "" : "This field is required.";

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
  const handleSelect = async (value) => {
    setAddress(value);
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);

    if (results && latlng) {
      setFormattedAddress(results[0].formatted_address);
      // setSubLocality(results[0].address_components[0].long_name)
      // setLocality(results[1].address_components[0].long_name)
      setLat(latlng.lat);
      setLng(latlng.lng);
    }
    // console.log(results);
    // console.log(latlng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    if (validate()) {
      const branchData = {
        branchName: values.branchName,
        phoneNo: values.phoneNo,
        region: values.region,
        formattedAddress: formattedAddress,
        lat: lat,
        lng: lng,
        city: values.city,
        zip: values.zip,
      };

      dispatch(addBranch(branchData));

      // {
      loading === false && dispatch(fetchBranches());
      dispatch(fetchBranches());
      // addOrEdit(branchData, resetForm);
      //   localStorage.setItem(
      //     "branches",
      //     JSON.stringify([branchesData.branches])
      //   );
      // const branchesda = JSON.parse(localStorage.getItem("branches"));
      // const { branches } = await branchesda;
      // console.log(branches);

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
          addOrEdit(branchData, resetForm);
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
            name="branchName"
            label="Terminal/Station Name"
            value={values.branchName}
            onChange={handleInputChange}
            error={errors.branchName}
          />
          <Controls.Input
            label="Telephone Number"
            name="phoneNo"
            value={values.phoneNo}
            onChange={handleInputChange}
            error={errors.phoneNo}
          />
          <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}>
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <>
                <InputBase
                  {...getInputProps({
                    placeholder: "Enter Terminal address",
                  })}
                  className={classes.input}
                  inputProps={{
                    "aria-label": "search google maps for delivery address",
                  }}
                />
                <div className={classes.results}>
                  {loading ? <div>Getting Results...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = suggestion.active
                      ? { backgroundColor: "#41b6e6", cursor: "pointer" }
                      : { backgroundColor: "#fff", cursor: "pointer" };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </PlacesAutocomplete>
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Zip"
            name="zip"
            value={values.zip}
            onChange={handleInputChange}
            error={errors.zip}
          />
          <Controls.Input
            name="city"
            label="City / District/ Town"
            value={values.city}
            onChange={handleInputChange}
            // onChange={(e) => setType(e.target.value)}
            // options={capitalItems}
            error={errors.city}
          />
          <Controls.Select
            name="region"
            label="Region"
            value={values.region}
            onChange={handleInputChange}
            // onChange={(e) => setType(e.target.value)}
            options={regionItems}
            error={errors.region}
          />
          {/* <Controls.DriverSelect
            name="driver"
            label="Driver"
            value={values.driver}
            onChange={handleInputChange}
            // onChange={(e) => setDriver(e.target.value)}
            // options={getDriverCollection}
            options={drivers}
            error={errors.driver}
          /> */}
          {/* <Typography
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
          /> */}
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
