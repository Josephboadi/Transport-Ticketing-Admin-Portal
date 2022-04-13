import React, { useState, useEffect } from "react";
import { Avatar, Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import logo from "../assets/logo.png";
import * as employeeService from "../services/employeeService";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployee,
  editEmployee,
  fetchEmployees,
} from "../redux/actions/dataActions";
import { getUserData } from "../redux/actions/authActions";

const genderItems = [
  { id: "male", title: "Male" },
  { id: "female", title: "Female" },
  { id: "other", title: "Other" },
];

// const getRoleCollection = [
//   { id: "ROLE_ADMIN", title: "Admin" },
//   { id: "ROLE_DRIVER", title: "Driver" },
//   { id: "ROLE_SALES", title: "SALES" },
// ];

const initialFValues = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  gender: "male",
  password: "",
  role: "",
};

export default function PersonalAccountForm(props) {
  const dispatch = useDispatch();
  // const accountDetails = useSelector((state) => state.auth);
  const accountDetails = useSelector((state) => state.data.employee);

  // console.log(accountDetails);

  const { loading } = useSelector((state) => state.data);
  const employeesData = useSelector((state) => state.data.employees);
  const { addOrEdit, recordForEdit } = props;

  const [firstName1, setFirstName1] = useState(
    accountDetails.employee.firstName
  );
  const [lastName1, setLastName1] = useState(accountDetails.employee?.lastName);
  const [phoneNumber1, setPhoneNumber1] = useState(
    accountDetails.employee?.phoneNumber
  );
  const [email1, setEmail1] = useState(accountDetails.employee?.account.email);
  const [gender1, setGender1] = useState(accountDetails.employee?.gender);
  const [password1, setPassword1] = useState("");

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

  // const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
  //   useForm(initialFValues, true, validate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (validate()) {
    const employeeData = new FormData();
    // if (image) {
    //   employeeData.append("image", image);
    // }
    if (password1) {
      employeeData.append("firstName", firstName1);
      employeeData.append("lastName", lastName1);
      employeeData.append("email", email1);
      employeeData.append("phoneNumber", phoneNumber1);
      employeeData.append("gender", gender1);
      employeeData.append("password", password1);
      // employeeData.append("role", values.role);
      dispatch(editEmployee(employeeData, accountDetails.employee.empId));
    } else {
      employeeData.append("firstName", firstName1);
      employeeData.append("lastName", lastName1);
      employeeData.append("email", email1);
      employeeData.append("phoneNumber", phoneNumber1);
      employeeData.append("gender", gender1);

      // employeeData.append("role", values.role);
      dispatch(editEmployee(employeeData, accountDetails.employee._id));
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
            src={accountDetails.employee?.imageUrl}
            style={{ width: 80, height: 80, marginLeft: "42.5%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            name="firstName"
            label="First Name"
            // value={values.firstName}
            value={firstName1}
            // onChange={handleInputChange}
            onChange={(e) => setFirstName1(e.target.value)}
            // error={errors.firstName}
          />
          <Controls.Input
            name="lastName"
            label="Last Name"
            // value={values.lastName}
            value={lastName1}
            // onChange={handleInputChange}
            onChange={(e) => setLastName1(e.target.value)}
            // error={errors.lastName}
          />
          <Controls.Input
            label="Email"
            name="email"
            // value={values.email}
            value={email1}
            // onChange={handleInputChange}
            onChange={(e) => setEmail1(e.target.value)}
            // error={errors.email}
          />
          {/* <Controls.Input
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          /> */}
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Phone Number"
            name="phoneNumber"
            // value={values.phoneNumber}
            value={phoneNumber1}
            // onChange={handleInputChange}
            onChange={(e) => setPhoneNumber1(e.target.value)}
            // error={errors.phoneNumber}
          />
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            // value={values.gender}
            value={gender1}
            // onChange={handleInputChange}
            onChange={(e) => setGender1(e.target.value)}
            items={genderItems}
          />
          <Controls.Input
            label="Password"
            name="password"
            // value={values.password}
            value={password1}
            // onChange={handleInputChange}
            onChange={(e) => setPassword1(e.target.value)}
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
