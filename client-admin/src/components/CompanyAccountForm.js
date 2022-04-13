import React, { useState, useEffect } from "react";
import { Avatar, Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import logo from "../assets/logo.png";
import * as employeeService from "../services/employeeService";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  editCompany,
  editEmployee,
  fetchEmployees,
} from "../redux/actions/dataActions";
import { getUserData, logoutAction } from "../redux/actions/authActions";
import jwtDecode from "jwt-decode";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

const getRoleCollection = [
  { id: "ROLE_ADMIN", title: "Admin" },
  { id: "ROLE_DRIVER", title: "Driver" },
  { id: "ROLE_SALES", title: "SALES" },
];

const initialFValues = {
  // id: 0,
  // firstName: "",
  // lastName: "",
  // email: "",
  // phoneNumber: "",
  // gender: "male",
  // password: "",
  // role: "",
};

export default function CompanyAccountForm(props) {
  const dispatch = useDispatch();
  // const accountDet = useSelector((state) => state.auth);
  const accountDetails = useSelector((state) => state.data.company);

  // console.log(accountDetails);
  // const { loading } = useSelector((state) => state.data);
  const employeesData = useSelector((state) => state.data.employees);
  const { addOrEdit, recordForEdit } = props;

  const [name, setName] = useState(accountDetails.company?.name);
  const [email, setEmail] = useState(accountDetails.company?.account.email);
  const [motto, setMotto] = useState(accountDetails.company?.motto);
  // const [city, setCity] = useState(accountDetails.company?.address.city);
  // const [region, setRegion] = useState(
  // accountDetails.company?.address.regionError
  // );
  // const [locality, setLocality] = useState(
  // accountDetails.company?.address.locality
  // );
  // const [zip, setZip] = useState(accountDetails.company?.address.zip);
  // const [phoneNo, setPhoneNo] = useState(
  //   accountDetails.company?.address.phoneNo
  // );
  // const [payment, setPayment] = useState(accountDetails);
  const [password, setPassword] = useState("");

  // const handleFileSelect = (event) => {
  //   setImage(event.target.files[0]);
  // };

  // const validate = (fieldValues = values) => {
  //   let temp = { ...errors };
  //   if ("firstName" in fieldValues)
  //     temp.firstName = fieldValues.firstName ? "" : "This field is required.";
  //   if ("lastName" in fieldValues)
  //     temp.lastName = fieldValues.lastName ? "" : "This field is required.";
  //   if ("email" in fieldValues)
  //     temp.email = /$^|.+@.+..+/.test(fieldValues.email)
  //       ? ""
  //       : "Email is not valid.";
  //   if ("phoneNumber" in fieldValues)
  //     temp.phoneNumber =
  //       fieldValues.phoneNumber.length > 9
  //         ? ""
  //         : "Minimum 10 numbers required.";
  //   if ("password" in fieldValues)
  //     temp.password =
  //       fieldValues.password.length > 5
  //         ? ""
  //         : "Password Should be more than or equal to 6 characters.";

  //   if ("role" in fieldValues)
  //     temp.role = fieldValues.role.length != 0 ? "" : "This field is required.";
  //   setErrors({
  //     ...temp,
  //   });

  //   if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  // };

  const { loading, serverError, errorsCompany } = useSelector(
    (state) => state.UI
  );

  const { message, errors } = errorsCompany || {};

  let emailError = null;
  // let passwordError = null;
  // let confirmPasswordError = null;
  // let streetError = null;
  let cityError = null;
  let regionError = null;
  let zipError = null;
  let phoneNoError = null;
  let nameError = null;
  let mottoError = null;
  // let paymentError = null;

  if (errors) {
    for (let error of errors) {
      if (error.msg.includes("valid email")) emailError = error.msg;
      // if (error.msg.includes("Email address already")) emailError = error.msg;
      // if (error.msg.includes("least 6 characters long"))
      //   passwordError = error.msg;
      // if (error.msg.includes("Passwords have to"))
      //   confirmPasswordError = error.msg;
      // if (error.msg.includes("10 digit phone")) phoneNoError = error.msg;
      // if (error.msg.includes("Zipcode cannot")) zipError = error.msg;
      // if (error.msg.includes("City cannot")) cityError = error.msg;
      // if (error.msg.includes("Apartment name cannot")) aptError = error.msg;
      // if (error.msg.includes("Region cannot")) regionError = error.msg;
      if (error.msg.includes("Motto cannot")) mottoError = error.msg;
      // if (error.msg.includes("Payment cannot be")) paymentError = error.msg;
      if (error.msg.includes("Company Name")) nameError = error.msg;
    }
  }

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

  // const {
  //   values,
  //   setValues,
  //   errors,
  //   setErrors,
  //   handleInputChange,
  //   resetForm,
  // } = useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validate()) {
    const companyData = new FormData();
    // if (image) {
    //   employeeData.append("image", image);
    // }
    if (password) {
      companyData.append("name", name);
      companyData.append("email", email);
      companyData.append("motto", motto);
      // companyData.append("city", city);
      // companyData.append("region", region);
      // companyData.append("locality", locality);
      // companyData.append("zip", zip);
      // companyData.append("phoneNo", phoneNo);
      companyData.append("password", password);
      // employeeData.append("payment", payment);

      // employeeData.append("role", values.role);
      dispatch(editCompany(companyData, accountDetails._id));
    } else {
      companyData.append("name", name);
      companyData.append("email", email);
      companyData.append("motto", motto);
      // companyData.append("city", city);
      // companyData.append("aptName", aptName);
      // companyData.append("region", region);
      // companyData.append("zip", zip);
      // companyData.append("phoneNo", phoneNo);
      // employeeData.append("payment", payment);
      // console.log(accountDetails.company._id);
      // employeeData.append("role", values.role);
      dispatch(editCompany(companyData, accountDetails.company._id));
    }
    // dispatch(getUserData());

    // {
    //   loading === false &&
    //     localStorage.setItem(
    //       "employees",
    //       JSON.stringify([employeesData.employees])
    //     );
    //   const employeesda = JSON.parse(localStorage.getItem("employees"));
    //   const { employees } = await employeesda;

    //   let countDownDate = new Date().getTime();
    //   let countDownDateSeconds =
    //     Math.floor((countDownDate % (1000 * 60)) / 1000) + 8;

    //   // update every second
    //   let x = setInterval(function () {
    //     // Get todays date and time
    //     let now = new Date().getTime();

    //     let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

    //     // find the distance between now and count down date
    //     let distance = countDownDateSeconds - nowSeconds;

    //     if (distance < 0) {
    //       clearInterval(x);
    //       addOrEdit(employeeData, resetForm);
    //     }
    //   }, 1000);
    // }
  };
  // };

  // useEffect(() => {
  //   if (recordForEdit != null)
  //     setValues({
  //       ...recordForEdit,
  //     });
  // }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Avatar
            alt="Remy Sharp"
            // src={logo}
            src={accountDetails.company?.imageUrl[0].img}
            style={{ width: 80, height: 80, marginLeft: "42.5%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            // name="name"
            label="Company Name"
            // value={values.firstName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            helperText={nameError}
            error={nameError ? true : false}
            required
            // value={firstName1}
            // onChange={handleInputChange}
            // onChange={(e) => setFirstName1(e.target.value)}
            // error={errors.firstName}
          />
          <Controls.Input
            // name="lastName"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            helperText={emailError}
            error={emailError ? true : false}
            required
            // value={values.lastName}
            // value={lastName1}
            // onChange={handleInputChange}
            // onChange={(e) => setLastName1(e.target.value)}
            // error={errors.lastName}
          />
          <Controls.Input
            label="Company Motto"
            value={motto}
            onChange={(e) => setMotto(e.target.value)}
            type="text"
            helperText={mottoError}
            error={mottoError ? true : false}
            required
            // value={values.email}
            // value={email1}
            // onChange={handleInputChange}
            // onChange={(e) => setEmail1(e.target.value)}
            // error={errors.email}
          />
          {/* <Controls.Input
            label="City / District / Town"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            helperText={cityError}
            error={cityError ? true : false}
            required
            // value={values.password}
            // onChange={handleInputChange}
            // error={errors.password}
          /> */}
          {/* <Controls.Input
            label="City / District / Town"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            type="text"
            required
            helperText={localityError}
            error={localityError ? true : false}
            // value={values.password}
            // onChange={handleInputChange}
            // error={errors.password}
          /> */}
        </Grid>
        <Grid item xs={6}>
          {/* <Controls.Input
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            type="text"
            required
            helperText={regionError}
            error={regionError ? true : false}
            // value={values.phoneNumber}
            // value={phoneNumber1}
            // onChange={handleInputChange}
            // onChange={(e) => setPhoneNumber1(e.target.value)}
            // error={errors.phoneNumber}
          /> */}
          {/* <Controls.Input
            label="Zip Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            type="text"
            helperText={zipError}
            error={zipError ? true : false}
            required
            // value={values.password}
            // value={password1}
            // onChange={handleInputChange}
            // onChange={(e) => setPassword1(e.target.value)}
            // error={errors.password}
          /> */}
          {/* <Controls.Input
            label="Company Telephone No."
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            type="number"
            helperText={phoneNoError}
            error={phoneNoError ? true : false}
            required
            // value={values.password}
            // value={password1}
            // onChange={handleInputChange}
            // onChange={(e) => setPassword1(e.target.value)}
            // error={errors.password}
          /> */}
          {/* <Controls.RadioGroup
            name="gender"
            label="Gender"
            // value={values.gender}
            value={gender1}
            // onChange={handleInputChange}
            onChange={(e) => setGender1(e.target.value)}
            items={genderItems}
          /> */}
          <Controls.Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // helperText={passwordError}
            // error={passwordError ? true : false}
            // required
            // value={values.password}
            // value={password1}
            // onChange={handleInputChange}
            // onChange={(e) => setPassword1(e.target.value)}
            // error={errors.password}
          />
          {/* <Controls.Select
            name="role"
            label="Role"
            value={values.role}
            onChange={handleInputChange}
            options={getRoleCollection}
            error={errors.role}
          /> */}
          {/* <Grid container>
            <Grid item xs={6}>
              <Controls.DatePicker
                name="hireDate"
                label="Hire Date"
                value={values.hireDate}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Controls.TimePicker
                label="Hire Time"
                name="hireTime"
                value={values.hireTime}
                // defaultValue={values.hireTime}
                onChange={handleInputChange}
                // error={errors.mobile}
              />
            </Grid> */}
          {/* <Controls.TimePicker
              name="hireTime"
              label="Hire Time"
              value={values.hireTime}
              onChange={handleInputChange}
            /> */}
          {/* </Grid> */}
          {/* <Controls.Checkbox
            name="isPermanent"
            label="Permanent Employee"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}

          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
