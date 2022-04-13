import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import { useHistory } from "react-router";
import avatar from "../../assets/driver.jpg";
import { logoutAction } from "../../redux/actions/authActions";
import { Link } from "react-router-dom";

const Navbar = ({ sidebarOpen, openSidebar }) => {
  const dispatch = useDispatch();
  const [role1, setRole1] = useState(null);
  const history = useHistory();

  const {
    authenticated,
    account: { role },
    // role,
    name,
    firstName,
    lastName,
    pic,
    address,
    imageUrl,
  } = useSelector((state) => state.auth);

  const dat = useSelector((state) => state.auth);

  // console.log(dat);

  // useEffect(() => {
  //   if (dat) {
  //     setRole1(dat?.role);
  //   }
  // }, [role1, setRole1, dat]);

  const handleLogout = () => {
    dispatch(logoutAction(history));
  };

  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSidebar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>
      <div className="navbar__left">
        {/* <a href="#">Subscribers</a>
        <a href="#">Video Management</a> */}
        {/* <a className="active_link" href="#">
          Admin
        </a> */}
      </div>
      <div className="navbar__right">
        {/* <a href="#">
          <i className="fa fa-search" aria-hidden="true"></i>
        </a>
        <a href="#">
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </a> */}
        {authenticated && role === "ROLE_COMPANY" ? (
          <>
            {/* <p>Hell</p> */}
            <Link to="#!">
              <img
                width="30"
                height="30"
                style={{ borderRadius: "50%" }}
                src={dat.imageUrl[0].img}
                alt="avatar"
              />
            </Link>
            <div className="navbar__logout">
              <i className="fa fa-power-off"></i>
              <Link to="/signin" onClick={handleLogout}>
                Log out
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
