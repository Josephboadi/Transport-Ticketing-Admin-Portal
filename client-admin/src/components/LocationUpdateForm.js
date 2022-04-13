import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import { editLocation, fetchLocations } from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

const regionItems = [
  { id: "Upper East", title: "Upper East" },
  { id: "Upper West", title: "Upper West" },
  { id: "North East", title: "North East" },
  { id: "Savannah", title: "Savannah" },
  { id: "Northern", title: "Northern" },
  { id: "Bono", title: "Bono" },
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
  name: "",
  region: "",
};

export default function LocationUpdateForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const locationsData = useSelector((state) => state.data.locations);

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
    if ("region" in fieldValues)
      temp.region = fieldValues.region ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    if (validate()) {
      const locationData = {
        name: values.name,
        region: values.region,
      };

      dispatch(editLocation(locationData, recordForEdit._id));

      // {
      loading === false && dispatch(fetchLocations());
      dispatch(fetchLocations());
      // editOrAdd(locationData, resetForm);
      //     localStorage.setItem(
      //       "locations",
      //       JSON.stringify([locationsData.locations])
      //     );
      //   const locationsda = JSON.parse(localStorage.getItem("locations"));
      //   const { locations } = await locationsda;

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
          editOrAdd(locationData, resetForm);
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
      <Grid container>
        <Grid item xs={6}>
          <Controls.Select
            name="name"
            label="Location Name"
            value={values.name}
            onChange={handleInputChange}
            options={capitalItems}
            error={errors.name}
          />
          {/* <Controls.Select
            label="Region"
            name="region"
            value={values.region}
            onChange={handleInputChange}
            options={regionItems}
            error={errors.region}
          /> */}

          {/* <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div> */}
        </Grid>
        <Grid item xs={6}>
          <Controls.Select
            label="Region"
            name="region"
            value={values.region}
            onChange={handleInputChange}
            options={regionItems}
            error={errors.region}
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
