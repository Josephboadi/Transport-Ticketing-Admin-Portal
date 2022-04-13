import React, { useEffect, useState } from "react";
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

// import useForm from "../../hooks/forms";
import { loginAction, loginAdminAction } from "../../redux/actions/authActions";
import { fetchSuperClients } from "../../redux/actions/dataActions";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [companies, setCompanies] = useState([]);

  const { loading, serverError, errors, signUpSuccess } = useSelector(
    (state) => state.UI
  );
  const clientsData = useSelector((state) => state.data.superClients);

  const dispatch = useDispatch();
  const history = useHistory();

  const loginAdminHandle = (props) => {
    const userAdminData = {
      email: email,
      password: password,
      companyId: companyId,
    };
    dispatch(loginAdminAction(userAdminData, history));
  };

  // use;

  //   const { inputs, handleInputChange, handleSubmit } = useForm(
  //     {
  //       email: "",
  //       password: "",
  //     },
  //     loginHandle
  //   );
  useEffect(() => {
    dispatch(fetchSuperClients());
  }, []);

  useEffect(() => {
    // dispatch(fetchClients());
    setCompanies(clientsData?.companies);
  }, [companies, setCompanies, clientsData]);

  // console.log(companies);

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    loginAdminHandle();
  };

  let companyError = null;
  let incorrectCredentialsError = null;
  let verifyEmailError = null;
  if (errors) {
    if (errors.includes("Invalid email/password"))
      incorrectCredentialsError = errors;
    if (errors.includes("Verify your email")) verifyEmailError = errors;
    // if (errors.includes("Select a company")) companyError = errors;
    for (let error of errors) {
      if (error.msg.includes("Select a company")) companyError = error.msg;
    }
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
              <FormLabel htmlFor="for">Companies</FormLabel>
              <select
                className="form-control"
                style={{
                  backgroundColor: "transparent",
                  outline: "none",
                  border: "none",
                  borderBottom: "2px solid #2874f0",
                  borderRadius: "4px",
                  height: "40px",
                  marginBottom: "16px",
                  color: "white",
                }}
                value={companyId}
                // placeholder="Enter city / district / town"
                onChange={(e) => setCompanyId(e.target.value)}
                required
                helperText={companyError}
                error={companyError ? true : false}>
                <option style={{ color: "#6A7575" }} value="">
                  Select a Company
                </option>
                {companies
                  ? companies.map((client, index) => (
                      <option
                        style={{ color: "#6A7575" }}
                        key={client._id}
                        value={client._id}>
                        {client.name}
                      </option>
                    ))
                  : null}

                {/* {dat.locations &&
                      dat.locations.map((location, index) => (
                        <option key={location._id} value={location._id}>
                          {location.name}
                        </option>
                      ))} */}
              </select>
              {serverError && (
                <FormLabel>{"server error, please try again"}</FormLabel>
              )}

              {verifyEmailError && <FormLabel>{verifyEmailError}</FormLabel>}

              {incorrectCredentialsError && (
                <FormLabel>{incorrectCredentialsError}</FormLabel>
              )}
              <FormButton type="submit" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </FormButton>
              <Text to="">Forgot password</Text>
              {/* <Text to="/signup">Do not have account</Text> */}
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
