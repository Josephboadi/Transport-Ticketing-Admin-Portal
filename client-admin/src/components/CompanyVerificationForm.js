import React, { useState, useEffect } from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import {
  editLocation,
  fetchCompanies,
  fetchLocations,
  verifyCompanyAccount,
} from "../redux/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

const isVerifiedItems = [
  { id: "true", title: "true" },
  { id: "false", title: "false" },
];

const initialFValues = {
  id: 0,
  isVerified: "",
};

export default function CompanyVerificationForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  // const locationsData = useSelector((state) => state.data.locations);

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
    if ("isVerified" in fieldValues)
      temp.isVerified =
        fieldValues.isVerified.length != 0 ? "" : "This field is required.";

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
      const verifyData = {
        isVerified: values.isVerified,
      };

      dispatch(verifyCompanyAccount(verifyData, recordForEdit._id));

      // {
      loading === false && dispatch(fetchCompanies());
      dispatch(fetchCompanies());
      // editOrAdd(verifyData, resetForm);
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
          editOrAdd(verifyData, resetForm);
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
        <Grid item xs={12}>
          {/* <Controls.Input
            name="isVerified"
            label="Location Name"
            value={values.isVerified}
            onChange={handleInputChange}
            error={errors.name}
          /> */}
          <Controls.Select
            label="Verify Company"
            name="isVerified"
            value={values.isVerified}
            onChange={handleInputChange}
            options={isVerifiedItems}
            error={errors.isVerified}
          />

          {/* <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div> */}
          <div>
            <Controls.Button
              disabled={isSuccessfull}
              type="submit"
              text="Submit"
            />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
        {/* <Grid item xs={6}>
          <Controls.Select
            label="Region"
            name="region"
            value={values.region}
            onChange={handleInputChange}
            options={regionItems}
            error={errors.region}
          />
          <div>
            <Controls.Button
              disabled={isSuccessfull}
              type="submit"
              text="Submit"
            />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid> */}
      </Grid>
    </Form>
  );
}
