import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
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
} from "./SigninElements";

import useForm from "../../hooks/forms";
import { loginAction } from "../../redux/actions/authActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, serverError, errors, signUpSuccess } = useSelector(
    (state) => state.UI
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const loginHandle = (props) => {
    const userData = {
      email: email,
      password: password,
    };
    dispatch(loginAction(userData, history));
  };

  //   const { inputs, handleInputChange, handleSubmit } = useForm(
  //     {
  //       email: "",
  //       password: "",
  //     },
  //     loginHandle
  //   );

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    loginHandle();
  };

  let incorrectCredentialsError = null;
  let verifyEmailError = null;
  if (errors) {
    if (errors.includes("Invalid email/password"))
      incorrectCredentialsError = errors;
    if (errors.includes("Verify your email")) verifyEmailError = errors;
  }

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Travel Gh</Icon>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                required
              />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                required
              />
              {serverError && (
                <FormLabel>{"server error, please try again"}</FormLabel>
              )}

              {verifyEmailError && <FormLabel>{verifyEmailError}</FormLabel>}

              {incorrectCredentialsError && (
                <FormLabel>{incorrectCredentialsError}</FormLabel>
              )}
              <FormButton type="submit" disabled={loading}>
                Login
              </FormButton>
              <Text to="/reset-password">Forgot password</Text>
              <Text to="/signup">Do not have account</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
