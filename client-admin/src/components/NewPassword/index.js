import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Form,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormWrap,
  Icon,
  Text,
} from "./SignupElements";

// import useForm from "../../hooks/forms";

import { newPasword, signupUser } from "../../redux/actions/authActions";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const { loading, serverError, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();

  const changePassHandle = (props) => {
    const newPassData = {
      password: password,
      confirmPassword: confirmPassword,
      token: token,
    };
    dispatch(newPasword(newPassData, history));
  };

  // const { inputs, handleInputChange, handleSubmit } = useForm(
  //   {
  //     firstName: "",
  //     lastName: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  //   signupHandle
  // );

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    changePassHandle();
  };

  // console.log(errors);
  let passwordError = null;
  let confirmPasswordError = null;

  if (errors) {
    if (typeof errors !== "string") {
      for (let i = 0; i < errors.length; i++) {
        if (errors[i].msg.includes("least 6 characters long"))
          passwordError = errors[i].msg;
        if (errors[i].msg.includes("Passwords have to equal"))
          confirmPasswordError = errors[i].msg;
      }
    }
  }
  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Travel Gh</Icon>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              <FormH1>Change Password</FormH1>

              <FormLabel htmlFor="for">New Password</FormLabel>
              <FormInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                helperText={passwordError}
                error={passwordError ? true : false}
                required
              />
              <FormLabel htmlFor="for">Confirm Password</FormLabel>
              <FormInput
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                helperText={
                  passwordError ? passwordError : confirmPasswordError
                }
                error={
                  passwordError ? true : confirmPasswordError ? true : false
                }
                required
              />

              {serverError && (
                <FormLabel>{"server error, please try again"}</FormLabel>
              )}

              <FormButton disabled={loading} type="submit">
                Update Password
              </FormButton>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default NewPassword;
