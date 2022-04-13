import React, { useState } from "react";
import { useHistory } from "react-router";
// import M from "materialize-css";
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

// import useForm from "../../hooks/forms";
import { loginAction, resetAction } from "../../redux/actions/authActions";

const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const { loading, serverError, errors } = useSelector((state) => state.UI);
  const dispatch = useDispatch();
  const history = useHistory();

  let incorrectCredentialsError = null;
  if (errors) {
    if (errors.includes("Email does not exist."))
      incorrectCredentialsError = errors;
  }
  // else {
  //   incorrectCredentialsError = null;
  // }

  const resetHandle = (props) => {
    // incorrectCredentialsError = "true";
    const userData = {
      email: email,
    };
    dispatch(resetAction(userData, history));

    // if (
    //   !serverError &&
    //   incorrectCredentialsError !== "Email does not exist." &&
    //   incorrectCredentialsError !== "true"
    // ) {
    //   history.push("/signin");

    // }
    setEmail("");
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
    resetHandle();
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Travel Gh</Icon>
          <FormContent>
            <Form onSubmit={handleSubmit}>
              <FormH1>Reset Password</FormH1>
              <FormLabel>
                {
                  "Enter your email and click on Submit. Afterwards, Check Your Email for a link to reset your Password"
                }
              </FormLabel>

              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter Email"
                required
              />

              {serverError && (
                <FormLabel>{"server error, please try again"}</FormLabel>
              )}

              {incorrectCredentialsError && (
                <FormLabel>{incorrectCredentialsError}</FormLabel>
              )}
              {/* {!serverError && !incorrectCredentialsError && (
                <FormLabel>
                  {
                    "Enter your email and click on Submit. Afterwards, Check Your Email for a link to reset your Password"
                  }
                </FormLabel>
              )} */}
              <FormButton type="submit" disabled={loading}>
                Submit
              </FormButton>
              <Text to="/signin">Done resetting? Login.</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default ResetPassword;
