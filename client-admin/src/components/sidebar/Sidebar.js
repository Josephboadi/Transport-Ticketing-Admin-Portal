import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Sidebar.css";
// import { Link } from "react-router-dom";
import logo from "../../assets/driver.jpg";
import { getUserData, logoutAction } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const [role1, setRole1] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [activeclicked, setActiveClicked] = useState(false);
  const [dashboard, setDashboard] = useState(1);
  const [subdashboard, setSubDashboard] = useState(1);
  const [employees, setEmployees] = useState(2);
  const [subEmployees, setSubEmployees] = useState(2);
  const [vehicles, setVehicles] = useState(3);
  const [subVehicles, setSubVehicles] = useState(3);
  const [locations, setLocations] = useState(4);
  const [subLocations, setSubLocations] = useState(4);
  const [trips, setTrips] = useState(5);
  const [subTrips, setSubTrips] = useState(5);
  const [account, setAccount] = useState(6);
  const [complaint, setComplaint] = useState(15);
  const [refunds, setRefunds] = useState(13);
  const [booking, setBooking] = useState(7);
  const [bookingOnline, setBookingOnline] = useState(12);
  const [branch, setBranch] = useState(8);
  const [paymentAccount, setPaymentAccount] = useState(9);
  const [companies, setCompanies] = useState(10);
  const [payAccount, setPayAccount] = useState(11);
  const [index, setIndex] = useState(0);
  const [activeindex, setActiveIndex] = useState(0);

  const dispatch = useDispatch();
  const history = useHistory();

  const {
    authenticated,
    loading,

    account: { role },
    // role,
    name,
    firstName,
    lastName,
    pic,
    address,
    imageUrl,
  } = useSelector((state) => state.auth);
  const datta = useSelector((state) => state.auth);
  // console.log(datta);

  // useEffect(() => {
  //   if (datta) {
  //     setRole1(datta?.role);
  //   }
  // }, [role1, setRole1, datta]);

  const toggle = (index) => {
    if (clicked === index) {
      //if clicked question is already active, then close it
      return setClicked(null);
    }

    setClicked(index);
  };

  const activetoggle = (activeindex) => {
    if (activeclicked === activeindex) {
      //if clicked question is already active, then close it
      return setActiveClicked(null);
    }

    setActiveClicked(activeindex);
  };

  return (
    <div className={sidebarOpen ? "sidebar_responsive" : ""} id="sidebar">
      <div className="sidebar__title">
        {authenticated && !loading && role === "ROLE_COMPANY" ? (
          <div className="sidebar__img">
            <img src={imageUrl[0].img} alt="logo" />
            <h1>{name}</h1>
          </div>
        ) : null}

        <i
          onClick={() => closeSidebar()}
          className="fa fa-times"
          id="sidebarIcon"
          // aria-hidden="true"
        ></i>
      </div>

      {datta?.role ? (
        datta?.role === "ROLE_ADMIN" ? (
          <div className="sidebar__menu">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <div
                className={`sidebar__link ${
                  clicked === dashboard ? "active_menu_link" : ""
                }`}
                value={dashboard}
                // onMouseOver={(e) => toggle(dashboard)}
                onClick={(e) => toggle(dashboard)}>
                <div>
                  <i
                    className="fa fa-dashboard"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/">
                    Dashboard
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/complaint">
              <div
                className={`sidebar__link ${
                  clicked === complaint ? "active_menu_link" : ""
                }`}
                value={complaint}
                onClick={(e) => toggle(complaint)}>
                <div>
                  <i
                    className="fa fa-inbox"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/complaint">
                    Complaints
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/branch">
              <div
                className={`sidebar__link ${
                  clicked === branch ? "active_menu_link" : ""
                }`}
                value={branch}
                onClick={(e) => toggle(branch)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/branch">
                    Terminals/Stations
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/refunds">
              <div
                className={`sidebar__link ${
                  clicked === refunds ? "active_menu_link" : ""
                }`}
                value={refunds}
                onClick={(e) => toggle(refunds)}>
                <div>
                  <i
                    className="fa fa-money"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/refunds">
                    Refund Requests
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/bookingonline">
              <div
                className={`sidebar__link ${
                  clicked === bookingOnline ? "active_menu_link" : ""
                }`}
                value={bookingOnline}
                onClick={(e) => toggle(bookingOnline)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/bookingonline">
                    Bookings Online
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/booking">
              <div
                className={`sidebar__link ${
                  clicked === booking ? "active_menu_link" : ""
                }`}
                value={booking}
                onClick={(e) => toggle(booking)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/booking">
                    Book Ticket
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === dashboard ? (
          <div
            onClick={(e) => activetoggle(subdashboard)}
            className={`sidebar__Drop ${
              activeclicked === subdashboard ? "active_menu_link" : ""
            }`}>
            <i className="fa fa-home"></i>
            <a to="#">Dashboard</a>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              <div
                className={`sidebar__link ${
                  clicked === employees ? "active_menu_link" : ""
                }`}
                value={employees}
                onClick={(e) => toggle(employees)}>
                <div>
                  <i
                    className="fa fa-users"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/employees">
                    Employees
                  </Link>
                </div>
                {/* {clicked === employees ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === employees ? (
          <div
            onClick={(e) => activetoggle(subEmployees)}
            className={`sidebar__Drop ${
              activeclicked === subEmployees || clicked === employees
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              Employee List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              <div
                className={`sidebar__link ${
                  clicked === vehicles ? "active_menu_link" : ""
                }`}
                value={vehicles}
                onClick={(e) => toggle(vehicles)}>
                <div>
                  <i
                    className="fa fa-bus"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/vehicles">
                    Vehicles
                  </Link>
                </div>

                {/* {clicked === vehicles ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === vehicles ? (
          <div
            onClick={(e) => activetoggle(subVehicles)}
            className={`sidebar__Drop ${
              activeclicked === subVehicles || clicked === vehicles
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              Vehicle List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/locations">
              <div
                className={`sidebar__link ${
                  clicked === locations ? "active_menu_link" : ""
                }`}
                value={locations}
                onClick={(e) => toggle(locations)}>
                <div>
                  <i
                    className="fa fa-location-arrow"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/locations">
                    Locations
                  </Link>
                </div>

                {/* {clicked === locations ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === locations ? (
          <div
            onClick={(e) => activetoggle(subLocations)}
            className={`sidebar__Drop ${
              activeclicked === subLocations || clicked === locations
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="locations">
              Location List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/trips">
              <div
                className={`sidebar__link ${
                  clicked === trips ? "active_menu_link" : ""
                }`}
                value={trips}
                onClick={(e) => toggle(trips)}>
                <div>
                  <i
                    className="fa fa-suitcase"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/trips">
                    Trips
                  </Link>
                </div>

                {/* {clicked === trips ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === trips ? (
          <div
            onClick={(e) => activetoggle(subTrips)}
            className={`sidebar__Drop ${
              activeclicked === subTrips || clicked === trips
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link style={{ textDecoration: "none", color: "white" }} to="trips">
              Trip List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/account">
              <div
                onClick={(e) => toggle(account)}
                className={`sidebar__account ${
                  clicked === account ? "active_menu_link" : ""
                }`}>
                <i className="fa fa-user" style={{ marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/account">
                  My Account
                </Link>
              </div>
            </Link>
          </div>
        ) : datta.role === "ROLE_SALES" ? (
          <div className="sidebar__menu">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <div
                className={`sidebar__link ${
                  clicked === dashboard ? "active_menu_link" : ""
                }`}
                value={dashboard}
                // onMouseOver={(e) => toggle(dashboard)}
                onClick={(e) => toggle(dashboard)}>
                <div>
                  <i
                    className="fa fa-dashboard"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/">
                    Dashboard
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/refunds">
              <div
                className={`sidebar__link ${
                  clicked === refunds ? "active_menu_link" : ""
                }`}
                value={refunds}
                onClick={(e) => toggle(refunds)}>
                <div>
                  <i
                    className="fa fa-money"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/refunds">
                    Refund Requests
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/bookingonline">
              <div
                className={`sidebar__link ${
                  clicked === bookingOnline ? "active_menu_link" : ""
                }`}
                value={bookingOnline}
                onClick={(e) => toggle(bookingOnline)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/bookingonline">
                    Bookings Online
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/booking">
              <div
                className={`sidebar__link ${
                  clicked === booking ? "active_menu_link" : ""
                }`}
                value={booking}
                onClick={(e) => toggle(booking)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/booking">
                    Book Ticket
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === dashboard ? (
          <div
            onClick={(e) => activetoggle(subdashboard)}
            className={`sidebar__Drop ${
              activeclicked === subdashboard ? "active_menu_link" : ""
            }`}>
            <i className="fa fa-home"></i>
            <a to="#">Dashboard</a>
          </div>
        ) : null} */}

            {/* <div
            className={`sidebar__link ${
              clicked === employees ? "active_menu_link" : ""
            }`}
            value={employees}
            onClick={(e) => toggle(employees)}>
            <div>
              <i className="fa fa-users" style={{ marginRight: "10px" }}></i>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/employees">
                Employees
              </Link>
            </div> */}
            {/* {clicked === employees ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === employees ? (
          <div
            onClick={(e) => activetoggle(subEmployees)}
            className={`sidebar__Drop ${
              activeclicked === subEmployees || clicked === employees
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              Employee List
            </Link>
          </div>
        ) : null} */}

            {/* <div
              className={`sidebar__link ${
                clicked === vehicles ? "active_menu_link" : ""
              }`}
              value={vehicles}
              onClick={(e) => toggle(vehicles)}>
              <div>
                <i className="fa fa-bus" style={{ marginRight: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/vehicles">
                  Vehicles
                </Link>
              </div> */}
            {/* {clicked === vehicles ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === vehicles ? (
          <div
            onClick={(e) => activetoggle(subVehicles)}
            className={`sidebar__Drop ${
              activeclicked === subVehicles || clicked === vehicles
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              Vehicle List
            </Link>
          </div>
        ) : null} */}

            {/* <div
              className={`sidebar__link ${
                clicked === locations ? "active_menu_link" : ""
              }`}
              value={locations}
              onClick={(e) => toggle(locations)}>
              <div>
                <i
                  className="fa fa-location-arrow"
                  style={{ marginRight: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/locations">
                  Locations
                </Link>
              </div> */}
            {/* {clicked === locations ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === locations ? (
          <div
            onClick={(e) => activetoggle(subLocations)}
            className={`sidebar__Drop ${
              activeclicked === subLocations || clicked === locations
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="locations">
              Location List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/trips">
              <div
                className={`sidebar__link ${
                  clicked === trips ? "active_menu_link" : ""
                }`}
                value={trips}
                onClick={(e) => toggle(trips)}>
                <div>
                  <i
                    className="fa fa-suitcase"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/trips">
                    Trips
                  </Link>
                </div>
                {/* {clicked === trips ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === trips ? (
          <div
            onClick={(e) => activetoggle(subTrips)}
            className={`sidebar__Drop ${
              activeclicked === subTrips || clicked === trips
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link style={{ textDecoration: "none", color: "white" }} to="trips">
              Trip List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/account">
              <div
                onClick={(e) => toggle(account)}
                className={`sidebar__account ${
                  clicked === account ? "active_menu_link" : ""
                }`}>
                <i className="fa fa-user" style={{ marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/account">
                  My Account
                </Link>
              </div>
            </Link>
          </div>
        ) : datta.role === "ROLE_DRIVER" ? (
          <div className="sidebar__menu">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <div
                className={`sidebar__link ${
                  clicked === dashboard ? "active_menu_link" : ""
                }`}
                value={dashboard}
                // onMouseOver={(e) => toggle(dashboard)}
                onClick={(e) => toggle(dashboard)}>
                <div>
                  <i
                    className="fa fa-dashboard"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/">
                    Dashboard
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            {/* <div
            className={`sidebar__link ${
              clicked === booking ? "active_menu_link" : ""
            }`}
            value={booking}
            onClick={(e) => toggle(booking)}>
            <div>
              <i className="fa fa-ticket" style={{ marginRight: "10px" }}></i>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/booking">
                Book Ticket
              </Link>
            </div> */}
            {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === dashboard ? (
          <div
            onClick={(e) => activetoggle(subdashboard)}
            className={`sidebar__Drop ${
              activeclicked === subdashboard ? "active_menu_link" : ""
            }`}>
            <i className="fa fa-home"></i>
            <a to="#">Dashboard</a>
          </div>
        ) : null} */}

            {/* <div
            className={`sidebar__link ${
              clicked === employees ? "active_menu_link" : ""
            }`}
            value={employees}
            onClick={(e) => toggle(employees)}>
            <div>
              <i className="fa fa-users" style={{ marginRight: "10px" }}></i>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/employees">
                Employees
              </Link>
            </div> */}
            {/* {clicked === employees ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === employees ? (
          <div
            onClick={(e) => activetoggle(subEmployees)}
            className={`sidebar__Drop ${
              activeclicked === subEmployees || clicked === employees
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              Employee List
            </Link>
          </div>
        ) : null} */}

            {/* <div
              className={`sidebar__link ${
                clicked === vehicles ? "active_menu_link" : ""
              }`}
              value={vehicles}
              onClick={(e) => toggle(vehicles)}>
              <div>
                <i className="fa fa-bus" style={{ marginRight: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/vehicles">
                  Vehicles
                </Link>
              </div> */}
            {/* {clicked === vehicles ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === vehicles ? (
          <div
            onClick={(e) => activetoggle(subVehicles)}
            className={`sidebar__Drop ${
              activeclicked === subVehicles || clicked === vehicles
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              Vehicle List
            </Link>
          </div>
        ) : null} */}

            {/* <div
            className={`sidebar__link ${
              clicked === locations ? "active_menu_link" : ""
            }`}
            value={locations}
            onClick={(e) => toggle(locations)}>
            <div>
              <i
                className="fa fa-location-arrow"
                style={{ marginRight: "10px" }}></i>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/locations">
                Locations
              </Link>
            </div> */}
            {/* {clicked === locations ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            {/* </div> */}
            {/* {clicked === locations ? (
          <div
            onClick={(e) => activetoggle(subLocations)}
            className={`sidebar__Drop ${
              activeclicked === subLocations || clicked === locations
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="locations">
              Location List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/trips">
              <div
                className={`sidebar__link ${
                  clicked === trips ? "active_menu_link" : ""
                }`}
                value={trips}
                onClick={(e) => toggle(trips)}>
                <div>
                  <i
                    className="fa fa-suitcase"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/trips">
                    Trips
                  </Link>
                </div>
                {/* {clicked === trips ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === trips ? (
          <div
            onClick={(e) => activetoggle(subTrips)}
            className={`sidebar__Drop ${
              activeclicked === subTrips || clicked === trips
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link style={{ textDecoration: "none", color: "white" }} to="trips">
              Trip List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/account">
              <div
                onClick={(e) => toggle(account)}
                className={`sidebar__account ${
                  clicked === account ? "active_menu_link" : ""
                }`}>
                <i className="fa fa-user" style={{ marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/account">
                  My Account
                </Link>
              </div>
            </Link>
          </div>
        ) : (
          <div className="sidebar__menu">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              <div
                className={`sidebar__link ${
                  clicked === dashboard ? "active_menu_link" : ""
                }`}
                value={dashboard}
                // onMouseOver={(e) => toggle(dashboard)}
                onClick={(e) => toggle(dashboard)}>
                <div>
                  <i
                    className="fa fa-dashboard"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/">
                    Dashboard
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/companies">
              <div
                className={`sidebar__link ${
                  clicked === companies ? "active_menu_link" : ""
                }`}
                value={companies}
                onClick={(e) => toggle(companies)}>
                <div>
                  <i
                    className="fa fa-building"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/companies">
                    Companies
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/complaint">
              <div
                className={`sidebar__link ${
                  clicked === complaint ? "active_menu_link" : ""
                }`}
                value={complaint}
                onClick={(e) => toggle(complaint)}>
                <div>
                  <i
                    className="fa fa-inbox"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/complaint">
                    Complaints
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/branch">
              <div
                className={`sidebar__link ${
                  clicked === branch ? "active_menu_link" : ""
                }`}
                value={branch}
                onClick={(e) => toggle(branch)}>
                <div>
                  <i
                    className="fa fa-building"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/branch">
                    Terminals/Stations
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/refunds">
              <div
                className={`sidebar__link ${
                  clicked === refunds ? "active_menu_link" : ""
                }`}
                value={refunds}
                onClick={(e) => toggle(refunds)}>
                <div>
                  <i
                    className="fa fa-money"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/refunds">
                    Refund Requests
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/bookingonline">
              <div
                className={`sidebar__link ${
                  clicked === bookingOnline ? "active_menu_link" : ""
                }`}
                value={bookingOnline}
                onClick={(e) => toggle(bookingOnline)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/bookingonline">
                    Bookings Online
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/booking">
              <div
                className={`sidebar__link ${
                  clicked === booking ? "active_menu_link" : ""
                }`}
                value={booking}
                onClick={(e) => toggle(booking)}>
                <div>
                  <i
                    className="fa fa-ticket"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/booking">
                    Book Ticket
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === dashboard ? (
          <div
            onClick={(e) => activetoggle(subdashboard)}
            className={`sidebar__Drop ${
              activeclicked === subdashboard ? "active_menu_link" : ""
            }`}>
            <i className="fa fa-home"></i>
            <a to="#">Dashboard</a>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              <div
                className={`sidebar__link ${
                  clicked === employees ? "active_menu_link" : ""
                }`}
                value={employees}
                onClick={(e) => toggle(employees)}>
                <div>
                  <i
                    className="fa fa-users"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/employees">
                    Employees
                  </Link>
                </div>
                {/* {clicked === employees ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === employees ? (
          <div
            onClick={(e) => activetoggle(subEmployees)}
            className={`sidebar__Drop ${
              activeclicked === subEmployees || clicked === employees
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              Employee List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              <div
                className={`sidebar__link ${
                  clicked === vehicles ? "active_menu_link" : ""
                }`}
                value={vehicles}
                onClick={(e) => toggle(vehicles)}>
                <div>
                  <i
                    className="fa fa-bus"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/vehicles">
                    Vehicles
                  </Link>
                </div>

                {/* {clicked === vehicles ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === vehicles ? (
          <div
            onClick={(e) => activetoggle(subVehicles)}
            className={`sidebar__Drop ${
              activeclicked === subVehicles || clicked === vehicles
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              Vehicle List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/locations">
              <div
                className={`sidebar__link ${
                  clicked === locations ? "active_menu_link" : ""
                }`}
                value={locations}
                onClick={(e) => toggle(locations)}>
                <div>
                  <i
                    className="fa fa-location-arrow"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/locations">
                    Locations
                  </Link>
                </div>

                {/* {clicked === locations ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === locations ? (
          <div
            onClick={(e) => activetoggle(subLocations)}
            className={`sidebar__Drop ${
              activeclicked === subLocations || clicked === locations
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="locations">
              Location List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/trips">
              <div
                className={`sidebar__link ${
                  clicked === trips ? "active_menu_link" : ""
                }`}
                value={trips}
                onClick={(e) => toggle(trips)}>
                <div>
                  <i
                    className="fa fa-suitcase"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/trips">
                    Trips
                  </Link>
                </div>

                {/* {clicked === trips ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
              </div>
            </Link>
            {/* {clicked === trips ? (
          <div
            onClick={(e) => activetoggle(subTrips)}
            className={`sidebar__Drop ${
              activeclicked === subTrips || clicked === trips
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link style={{ textDecoration: "none", color: "white" }} to="trips">
              Trip List
            </Link>
          </div>
        ) : null} */}
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/payaccounts">
              <div
                className={`sidebar__link ${
                  clicked === payAccount ? "active_menu_link" : ""
                }`}
                value={payAccount}
                onClick={(e) => toggle(payAccount)}>
                <div>
                  <i
                    className="fa fa-money"
                    style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/payaccounts">
                    Payment Accounts
                  </Link>
                </div>
                {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
              </div>
            </Link>

            {/* <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/companyaccount">
            <div
              onClick={(e) => toggle(account)}
              className={`sidebar__account ${
                clicked === account ? "active_menu_link" : ""
              }`}>
              <i className="fa fa-user" style={{ marginLeft: "10px" }}></i>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/companyaccount">
                Account
              </Link>
            </div>
          </Link> */}
          </div>
        )
      ) : (
        <div className="sidebar__menu">
          <Link style={{ textDecoration: "none", color: "white" }} to="/">
            <div
              className={`sidebar__link ${
                clicked === dashboard ? "active_menu_link" : ""
              }`}
              value={dashboard}
              // onMouseOver={(e) => toggle(dashboard)}
              onClick={(e) => toggle(dashboard)}>
              <div>
                <i
                  className="fa fa-dashboard"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link style={{ textDecoration: "none", color: "white" }} to="/">
                  Dashboard
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/complaint">
            <div
              className={`sidebar__link ${
                clicked === complaint ? "active_menu_link" : ""
              }`}
              value={complaint}
              onClick={(e) => toggle(complaint)}>
              <div>
                <i
                  className="fa fa-inbox"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/complaint">
                  Complaints
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>

          <Link style={{ textDecoration: "none", color: "white" }} to="/branch">
            <div
              className={`sidebar__link ${
                clicked === branch ? "active_menu_link" : ""
              }`}
              value={branch}
              onClick={(e) => toggle(branch)}>
              <div>
                <i
                  className="fa fa-building"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/branch">
                  Terminals/Stations
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/refunds">
            <div
              className={`sidebar__link ${
                clicked === refunds ? "active_menu_link" : ""
              }`}
              value={refunds}
              onClick={(e) => toggle(refunds)}>
              <div>
                <i
                  className="fa fa-money"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/refunds">
                  Refund Requests
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/bookingonline">
            <div
              className={`sidebar__link ${
                clicked === bookingOnline ? "active_menu_link" : ""
              }`}
              value={bookingOnline}
              onClick={(e) => toggle(bookingOnline)}>
              <div>
                <i
                  className="fa fa-ticket"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/bookingonline">
                  Bookings Online
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/booking">
            <div
              className={`sidebar__link ${
                clicked === booking ? "active_menu_link" : ""
              }`}
              value={booking}
              onClick={(e) => toggle(booking)}>
              <div>
                <i
                  className="fa fa-ticket"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/booking">
                  Book Ticket
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>
          {/* {clicked === dashboard ? (
          <div
            onClick={(e) => activetoggle(subdashboard)}
            className={`sidebar__Drop ${
              activeclicked === subdashboard ? "active_menu_link" : ""
            }`}>
            <i className="fa fa-home"></i>
            <a to="#">Dashboard</a>
          </div>
        ) : null} */}
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/employees">
            <div
              className={`sidebar__link ${
                clicked === employees ? "active_menu_link" : ""
              }`}
              value={employees}
              onClick={(e) => toggle(employees)}>
              <div>
                <i
                  className="fa fa-users"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/employees">
                  Employees
                </Link>
              </div>
              {/* {clicked === employees ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            </div>
          </Link>
          {/* {clicked === employees ? (
          <div
            onClick={(e) => activetoggle(subEmployees)}
            className={`sidebar__Drop ${
              activeclicked === subEmployees || clicked === employees
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/employees">
              Employee List
            </Link>
          </div>
        ) : null} */}
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/vehicles">
            <div
              className={`sidebar__link ${
                clicked === vehicles ? "active_menu_link" : ""
              }`}
              value={vehicles}
              onClick={(e) => toggle(vehicles)}>
              <div>
                <i
                  className="fa fa-bus"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/vehicles">
                  Vehicles
                </Link>
              </div>

              {/* {clicked === vehicles ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            </div>
          </Link>
          {/* {clicked === vehicles ? (
          <div
            onClick={(e) => activetoggle(subVehicles)}
            className={`sidebar__Drop ${
              activeclicked === subVehicles || clicked === vehicles
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/vehicles">
              Vehicle List
            </Link>
          </div>
        ) : null} */}
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/locations">
            <div
              className={`sidebar__link ${
                clicked === locations ? "active_menu_link" : ""
              }`}
              value={locations}
              onClick={(e) => toggle(locations)}>
              <div>
                <i
                  className="fa fa-location-arrow"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/locations">
                  Locations
                </Link>
              </div>

              {/* {clicked === locations ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            </div>
          </Link>
          {/* {clicked === locations ? (
          <div
            onClick={(e) => activetoggle(subLocations)}
            className={`sidebar__Drop ${
              activeclicked === subLocations || clicked === locations
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="locations">
              Location List
            </Link>
          </div>
        ) : null} */}
          <Link style={{ textDecoration: "none", color: "white" }} to="/trips">
            <div
              className={`sidebar__link ${
                clicked === trips ? "active_menu_link" : ""
              }`}
              value={trips}
              onClick={(e) => toggle(trips)}>
              <div>
                <i
                  className="fa fa-suitcase"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/trips">
                  Trips
                </Link>
              </div>

              {/* {clicked === trips ? (
            <i className="fa fa-caret-up"></i>
          ) : (
            <i className="fa fa-caret-down"></i>
          )} */}
            </div>
          </Link>
          {/* {clicked === trips ? (
          <div
            onClick={(e) => activetoggle(subTrips)}
            className={`sidebar__Drop ${
              activeclicked === subTrips || clicked === trips
                ? "active_menu_link"
                : ""
            }`}>
            <i className="fa fa-list-ul"></i>
            <Link style={{ textDecoration: "none", color: "white" }} to="trips">
              Trip List
            </Link>
          </div>
        ) : null} */}
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/paymentaccounts">
            <div
              className={`sidebar__link ${
                clicked === paymentAccount ? "active_menu_link" : ""
              }`}
              value={paymentAccount}
              onClick={(e) => toggle(paymentAccount)}>
              <div>
                <i
                  className="fa fa-money"
                  style={{ marginRight: "10px", marginLeft: "10px" }}></i>
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/paymentaccounts">
                  Payment Accounts
                </Link>
              </div>
              {/* {clicked === dashboard ? (
            <i className="fa fa-arrow-up"></i>
          ) : (
            <i className="fa fa-arrow-down"></i>
          )} */}
            </div>
          </Link>

          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/companyaccount">
            <div
              onClick={(e) => toggle(account)}
              className={`sidebar__account ${
                clicked === account ? "active_menu_link" : ""
              }`}>
              <i className="fa fa-user" style={{ marginLeft: "10px" }}></i>
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/companyaccount">
                Account
              </Link>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
