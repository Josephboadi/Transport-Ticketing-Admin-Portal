import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "./controls/Controls";
import { useForm, Form } from "./useForm";
import * as employeeService from "../services/employeeService";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, fetchEmployees } from "../redux/actions/dataActions";
import jwtDecode from "jwt-decode";
import { logoutAction } from "../redux/actions/authActions";

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
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "233",
  gender: "male",
  password: "",
  role: "",
};

export default function EmployeeForm(props) {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const employeesData = useSelector((state) => state.data.employees);
  const { addOrEdit, recordForEdit } = props;

  // const [image, setImage] = useState(null);

  // const handleFileSelect = (event) => {
  //   setImage(event.target.files[0]);
  // };
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
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email)
        ? ""
        : "Email is not valid.";
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber =
        fieldValues.phoneNumber.length > 9
          ? ""
          : "Minimum 10 numbers required.";
    if ("password" in fieldValues)
      temp.password =
        fieldValues.password.length > 5
          ? ""
          : "Password Should be more than or equal to 6 characters.";

    if ("role" in fieldValues)
      temp.role = fieldValues.role.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  // useEffect(() => {
  //   if (!employeesData.employees || employeesData.employees == null) {
  //     setIsSuccessfull(false);
  //   } else {
  //     setIsSuccessfull(true);
  //   }
  // }, []);

  let employeeData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSuccessfull(true);
    if (validate()) {
      employeeData = new FormData();
      // if (image) {
      //   employeeData.append("image", image);
      // }
      employeeData.append("firstName", values.firstName);
      employeeData.append("lastName", values.lastName);
      employeeData.append("email", values.email);
      employeeData.append("phoneNumber", values.phoneNumber);
      employeeData.append("gender", values.gender);
      employeeData.append("password", values.password);
      employeeData.append("role", values.role);
      dispatch(addEmployee(employeeData));

      // {
      loading === false && dispatch(fetchEmployees());
      dispatch(fetchEmployees());
      // addOrEdit(employeeData, resetForm);
      //   localStorage.setItem(
      //     "employees",
      //     JSON.stringify([employeesData.employees])
      //   );

      // const employeesda = JSON.parse(localStorage.getItem("employees"));
      // const { employees } = await employeesda;
      // console.log(employees);

      // setTimeout(function () {
      //   loading === false &&
      //     localStorage.setItem(
      //       "employees",
      //       JSON.stringify([employeesData.employees])
      //     );
      // }, 12000);

      // function check() {
      //   if (
      //     JSON.parse(localStorage.getItem("employees")) !=
      //     `${[employeesData.employees]}`
      //   ) {
      //     const employeesda = JSON.parse(localStorage.getItem("employees"));
      //     const { employees } = employeesda;
      //     console.log(employees);
      //     if (employeesda?.employees) {
      //       addOrEdit(employeeData, resetForm);
      //     }
      //   } else {
      //     setTimeout(check, 0);
      //     console.log("b");
      //   }
      // }

      // setTimeout(check, 0);

      // if (employeesData.employees == null) {
      //   setIsSuccessfull(false);
      // } else {
      //   setIsSuccessfull(true);
      // }

      // if (isSuccessfull === null) {
      //   return null;
      // } else if (isSuccessfull == false) {
      //   return null;
      // } else {
      //   addOrEdit(employeeData, resetForm);
      // }

      // if (isSuccessfull === null) {
      //   return null;
      // } else if (isSuccessfull == false) {
      //   return null;
      // } else {
      //   addOrEdit(employeeData, resetForm);
      // }

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
          // setIsSuccessfull(false);
          addOrEdit(employeeData, resetForm);
        }
      }, 1000);
      // }
      // if (isSuccessfull) {
      //   addOrEdit(employeeData, resetForm);
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
          <Controls.Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleInputChange}
            error={errors.firstName}
          />
          <Controls.Input
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleInputChange}
            error={errors.lastName}
          />
          <Controls.Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Controls.Input
            label="Password"
            name="password"
            value={values.password}
            onChange={handleInputChange}
            error={errors.password}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
          />
          <Controls.RadioGroup
            name="gender"
            label="Gender"
            value={values.gender}
            onChange={handleInputChange}
            items={genderItems}
          />
          <Controls.Select
            name="role"
            label="Role"
            value={values.role}
            onChange={handleInputChange}
            options={getRoleCollection}
            error={errors.role}
          />
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
            <Controls.Button disabled={loading} type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
