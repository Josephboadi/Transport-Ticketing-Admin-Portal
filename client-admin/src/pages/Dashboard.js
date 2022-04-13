import { useState } from "react";
import Main from "../components/main/Main";
import Employees from "../components/employees/Main";
import Companies from "../components/companies/Main";
import Vehicles from "../components/vehicles/Main";
import Locations from "../components/locations/Main";
import Trips from "../components/trips/Main";
import Account from "../components/account/Main";
import CompanyAccount from "../components/companyAccount/Main";
import PaymentAccounts from "../components/paymentAccount/Main";
import PayAccounts from "../components/payAccount/Main";
import Refunds from "../components/refunds/Main";
import Booking from "../components/booking/Main";
import Complaint from "../components/complaint/Main";
import BookingOnline from "../components/bookingOnline/Main";
import Branch from "../components/branch/Main";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";

// import Employees from "./Employees";
// import Vehicles from "./Vehicles";
// import Locations from "./Locations";
// import Trips from "./Trips";

const Dashboard = (props) => {
  const [clicked, setClicked] = useState(false);
  const [dashboard, setDashboard] = useState("/");
  const [vehicles, setVehicles] = useState("/vehicles");
  const [employees, setEmployees] = useState("/employees");
  const [locations, setLocations] = useState("/locations");
  const [paymentAccounts, setPaymentAccounts] = useState("/paymentaccounts");
  const [payAccounts, setPayAccounts] = useState("/payaccounts");
  const [trips, setTrips] = useState("/trips");
  const [account, setAccount] = useState("/account");
  const [complaint, setComplaint] = useState("/complaint");
  const [companyAccount, setCompanyAccount] = useState("/companyaccount");
  const [bookingOnline, setBookingOnline] = useState("/bookingonline");
  const [booking, setBooking] = useState("/booking");
  const [refunds, setRefunds] = useState("/refunds");

  const [branch, setBranch] = useState("/branch");
  const [companies, setCompanies] = useState("/companies");

  // console.log(props);
  const [sidebarOpen, setsidebarOpen] = useState(false);
  const openSidebar = () => {
    setsidebarOpen(true);
  };
  const closeSidebar = () => {
    setsidebarOpen(false);
  };

  return (
    <div className="container">
      <Navbar sidebarOpen={sidebarOpen} openSidebar={openSidebar} />
      {props.location.pathname === dashboard ? <Main /> : null}
      {props.location.pathname === employees ? <Employees /> : null}
      {props.location.pathname === companies ? <Companies /> : null}
      {props.location.pathname === vehicles ? <Vehicles /> : null}
      {props.location.pathname === locations ? <Locations /> : null}
      {props.location.pathname === paymentAccounts ? <PaymentAccounts /> : null}
      {props.location.pathname === payAccounts ? <PayAccounts /> : null}
      {props.location.pathname === trips ? <Trips /> : null}
      {props.location.pathname === account ? <Account /> : null}
      {props.location.pathname === complaint ? <Complaint /> : null}
      {props.location.pathname === companyAccount ? <CompanyAccount /> : null}
      {props.location.pathname === refunds ? <Refunds /> : null}
      {props.location.pathname === booking ? <Booking /> : null}
      {props.location.pathname === bookingOnline ? <BookingOnline /> : null}
      {props.location.pathname === branch ? <Branch /> : null}

      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </div>
  );
};

export default Dashboard;
