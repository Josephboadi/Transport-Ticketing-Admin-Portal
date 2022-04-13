import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";

//redux
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store";

import { SET_AUTHENTICATED } from "./redux/types";
import { logoutAction, getUserData } from "./redux/actions/authActions";

//axios
import axios from "./util/axios";

//jwt-decode
import jwtDecode from "jwt-decode";

//restrict routes
import {
  AuthRoute,
  AuthAdminRoute,
  CheckRoute,
  CompanyRoute,
  UserRoute,
} from "./util/route";

// import ClientAdmin from "./adminpages/ClientAdmin";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Vehicles from "./pages/Vehicles";
import Locations from "./pages/Locations";
import Trips from "./pages/Trips";
import SigninPage from "./pages/signin";
import SigninAdminPage from "./pages/signinAdmin";
import ResetPasswordPage from "./pages/resetpassword";
import ChangePasswordPage from "./pages/changepassword";
import { useEffect } from "react";
import {
  fetchBookings,
  fetchBranches,
  fetchCompanies,
  fetchCompany,
  fetchComplaints,
  fetchEmployee,
  fetchEmployees,
  fetchLocations,
  fetchPaymentAccounts,
  fetchRefunds,
  fetchSchTrips,
  fetchTrips,
  fetchVehicles,
} from "./redux/actions/dataActions";

const token = localStorage.jwt;

if (token) {
  const decodedToken = jwtDecode(token);
  // console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutAction());
    window.location.href = "/signin";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accountDetails = useSelector((state) => state.auth);

  // if (window.location.reload && history.location.pathname !== "/") {
  //   // console.log(this.props);
  //   // sessionStorage.reload = "";
  //   history.push("/");
  // }
  // console.log(accountDetails);
  // if (accountDetails.role) {
  //   dispatch(fetchEmployee(accountDetails.empId));
  // } else {
  //   dispatch(fetchCompany(accountDetails._id));
  //   console.log(accountDetails._id);
  // }

  useEffect(() => {
    dispatch(fetchSchTrips());
    dispatch(fetchTrips());
    dispatch(fetchRefunds());
    dispatch(fetchVehicles());
    dispatch(fetchBookings());
    dispatch(fetchLocations());
    dispatch(fetchEmployees());
    dispatch(fetchBranches());
    dispatch(fetchCompanies());
    dispatch(fetchPaymentAccounts());
    dispatch(fetchComplaints());
    if (accountDetails) {
      // console.log(accountDetails.role);
      // console.log(accountDetails._id);
      if (accountDetails.role) {
        dispatch(fetchEmployee(accountDetails.empId));
      } else {
        dispatch(fetchCompany(accountDetails._id));
        // console.log(accountDetails._id);
      }
    }
  }, [dispatch, accountDetails]);
  return (
    <Router>
      <Switch>
        <CheckRoute path="/" component={Dashboard} exact />
        <Route
          path="/reset-password/:token"
          component={ChangePasswordPage}
          exact
        />
        <Route path="/reset-password" component={ResetPasswordPage} exact />
        <CheckRoute path="/employees" component={Dashboard} exact />
        <CheckRoute path="/companies" component={Dashboard} exact />

        <CheckRoute path="/vehicles" component={Dashboard} exact />
        <CheckRoute path="/locations" component={Dashboard} exact />
        <CheckRoute path="/paymentaccounts" component={Dashboard} exact />
        <CheckRoute path="/payaccounts" component={Dashboard} exact />
        <CheckRoute path="/trips" component={Dashboard} exact />
        <CheckRoute path="/account" component={Dashboard} exact />
        <CheckRoute path="/complaint" component={Dashboard} exact />
        <CheckRoute path="/companyaccount" component={Dashboard} exact />
        <CheckRoute path="/refunds" component={Dashboard} exact />
        <CheckRoute path="/booking" component={Dashboard} exact />
        <CheckRoute path="/bookingonline" component={Dashboard} exact />
        <CheckRoute path="/branch" component={Dashboard} exact />
        <AuthRoute path="/signin" component={SigninPage} exact />
        <AuthRoute path="/signin-admin" component={SigninAdminPage} exact />
      </Switch>
    </Router>
  );
};

export default App;
