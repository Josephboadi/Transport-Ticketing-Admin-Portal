import React, { useState, useEffect } from "react";
import moment from "moment";
import "./Main.css";

import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { Table, Button } from "react-bootstrap";

import EmployeeForm from "../EmployeeForm";
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from "@material-ui/core";
import useTable from "../useTable";
import * as bookingService from "../../services/bookingService";
import * as tripService from "../../services/tripService";
import * as employeeService from "../../services/employeeService";
import * as vehicleService from "../../services/vehicleService";
import * as locationService from "../../services/locationService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings } from "../../redux/actions/dataActions";
import { useBeforeunload } from "react-beforeunload";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import { Ticks } from "chart.js";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "trip", label: "Trip Name" },
  { id: "tiketId", label: "Ticket Id" },
  { id: "date", label: "Boarding Date" },
  { id: "departure", label: "Departure Time" },
  { id: "name", label: "Customer" },
  { id: "phoneNo", label: "Customer No." },
  { id: "status", label: "Status" },
  // { id: "action", label: "Action", disableSorting: true },
];

const Main = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.data);
  const bookingsData = useSelector((state) => state.data.bookings);
  const tripsData = useSelector((state) => state.data.trips);
  const branchesData = useSelector((state) => state.data.branches);
  const vehiclesData = useSelector((state) => state.data.vehicles);
  const employeesData = useSelector((state) => state.data.employees);
  // const branchesData = useSelector((state) => state.data.branches);
  const locationsData = useSelector((state) => state.data.locations);
  const [vehicles, setVehicles] = useState([]);
  const [tripsS, setTripsS] = useState([]);
  const [tripsU, setTripsU] = useState([]);
  const [branches, setBranches] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [locations, setLocations] = useState([]);
  const [ionline, setIonline] = useState([]);
  const [iTonline, setITonline] = useState([]);
  const [costOnline, setCostOnline] = useState(0);
  const [bonline, setBonline] = useState([]);
  // const [bonline, setBonline] = useState([]);
  const [costPrem, setCostPrem] = useState(0);
  // const [data, setData] = useState();
  // const [options, setOptions] = useState();
  // const trips = useState(tripService.getAllTrips());
  // const bookings = useState(bookingService.GetAllBookings());
  // const vehicles = useState(vehicleService.getAllVehicles());
  // const drivers = useState(employeeService.getAllDrivers());
  // const locations = useState(locationService.getAllLocations());
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  // const [records, setRecords] = useState(bookingService.getAllDailyBookings());
  const [records, setRecords] = useState([]);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // console.log(bookings);
  let totalPrice;
  let totalOPrice;
  let totalBPrice;
  let totalTOPrice;
  // console.log(bookings);

  totalPrice = addDecimals(
    bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0)
  );

  // console.log(totalPrice);

  useEffect(() => {
    const drivs =
      employeesData?.employees &&
      employeesData?.employees
        .filter((drivers) => drivers.account.role === "ROLE_DRIVER")
        .map((x) => x);

    setDrivers([drivs]);

    // console.log(drivers);
  }, [employeesData]);

  useEffect(() => {
    const boks =
      bookingsData?.bookings &&
      bookingsData?.bookings
        .filter((books) => books.trips[0].trip.tripType === "Scheduled")
        .map((x) => x);

    setIonline([boks]);

    // setCostOnline(totalOPrice);
    // console.log(totalOPrice);
    // console.log(drivers);
  }, [bookingsData]);

  useEffect(() => {
    const boks =
      bookingsData?.bookings &&
      bookingsData?.bookings
        .filter(
          (books) =>
            books.trips[0].trip.tripType === "Scheduled" &&
            moment(books.createdAt).format("DD MMM, YYYY") ===
              moment(new Date()).format("DD MMM, YYYY")
        )
        .map((x) => x);

    setITonline([boks]);

    // setCostOnline(totalOPrice);
    // console.log(totalOPrice);
    // console.log(drivers);
  }, [bookingsData]);

  totalOPrice = addDecimals(
    ionline[0]?.reduce((acc, booking) => acc + booking.totalPrice, 0)
  );

  totalTOPrice = addDecimals(
    iTonline[0]?.reduce((acc, booking) => acc + booking.totalPrice, 0)
  );

  useEffect(() => {
    const boks =
      bookingsData?.bookings &&
      bookingsData?.bookings
        .filter((books) => books.trips[0].trip.tripType === "Unscheduled")
        .map((x) => x);

    setBonline([boks]);

    // setCostOnline(totalOPrice);
    // console.log(totalOPrice);
    // console.log(drivers);
  }, [bookingsData]);

  totalBPrice = addDecimals(
    bonline[0]?.reduce((acc, booking) => acc + booking.totalPrice, 0)
  );
  // console.log(totalOPrice);

  useEffect(() => {
    setVehicles(vehiclesData?.vehicles);
  }, [vehicles, setVehicles, vehiclesData]);

  useEffect(() => {
    const trS =
      tripsData?.trips &&
      tripsData?.trips
        .filter((trip) => trip.tripType === "Scheduled")
        .map((x) => x);
    setTripsS([trS]);
  }, [tripsData]);

  useEffect(() => {
    const trU =
      tripsData?.trips &&
      tripsData?.trips
        .filter((trip) => trip.tripType === "Unscheduled")
        .map((x) => x);
    setTripsU([trU]);
  }, [tripsData]);

  useEffect(() => {
    setBranches(branchesData?.branches);
  }, [branches, setBranches, branchesData]);

  let bdate = [];
  let btp = [];
  let data;
  let options;
  let datac;
  let optionsc;
  useEffect(() => {
    setBookings(bookingsData?.bookings);

    // let unique = [...new Map(bdate?.map((item) => [item, item])).values()];
  }, [bookings, setBookings, bookingsData]);

  let bbdate = [];
  let bbdateb = [];
  let bbdatei = [];

  let bbdatec = [];
  let bbdatebc = [];
  let bbdateic = [];

  // useEffect(() => {
  // console.log(bonline);
  // let countDownDate1 = new Date().getTime();
  // let countDownDateSeconds1 =
  //   Math.floor((countDownDate1 % (1000 * 60)) / 1000) + 5;

  // // update every second
  // let x1 = setInterval(function () {
  //   // Get todays date and time
  //   let now1 = new Date().getTime();

  //   let nowSeconds1 = Math.floor((now1 % (1000 * 60)) / 1000);

  //   // find the distance between now and count down date
  //   let distance1 = countDownDateSeconds1 - nowSeconds1;

  //   if (distance1 < 0) {
  if (bookingsData?.bookings) {
    for (const dataObj2 of bookingsData?.bookings) {
      bbdate.push({
        date: moment(dataObj2.createdAt).format("MMM, YYYY"),
        price: dataObj2.totalPrice,
      });
    }

    if (bookingsData?.bookings) {
      const bOl =
        bookingsData.bookings &&
        bookingsData.bookings
          .filter((books) => books.trips[0].trip.tripType === "Scheduled")
          .map((x) => x);

      const bsa = [bOl];
      // console.log(bsa);
      for (const dataObj21 of bsa[0]) {
        bbdateb.push({
          date: moment(dataObj21.createdAt).format("MMM, YYYY"),
          price: dataObj21.totalPrice,
        });
      }
    }

    // console.log(bbdateb);
    if (bookingsData?.bookings) {
      const iol =
        bookingsData.bookings &&
        bookingsData.bookings
          .filter((books) => books.trips[0].trip.tripType === "Unscheduled")
          .map((x) => x);

      const bssa = [iol];
      for (const dataObj22 of bssa[0]) {
        bbdatei.push({
          date: moment(dataObj22.createdAt).format("MMM, YYYY"),
          price: dataObj22.totalPrice,
        });
      }
    }

    // console.log(bbdate);

    const temp = {};
    const temp1 = {};
    const temp2 = {};
    let final;
    let bfinal;
    let ifinal;

    const tempc = {};
    const temp1c = {};
    const temp2c = {};
    let finalc;
    let bfinalc;
    let ifinalc;

    // You can use for..of, if you want
    bbdate.forEach(({ price, date }) => {
      // const [day, month] = date.split(" ");
      if (date in temp) {
        temp[date].totalPrice += price;
      } else {
        temp[date] = { date, totalPrice: price };
      }
    });

    bbdate.forEach(({ price, date }) => {
      // const [day, month] = date.split(" ");
      if (date in tempc) {
        tempc[date].totalQty += 1;
      } else {
        tempc[date] = { date, totalQty: 1 };
      }
    });

    bbdateb.forEach(({ price, date }) => {
      // const [day, month] = date.split(" ");
      if (date in temp1) {
        temp1[date].totalPrice += price;
      } else {
        temp1[date] = { date, totalPrice: price };
      }
    });

    bbdateb.forEach(({ price, date }) => {
      // const [day, month] = date.split(" ");
      if (date in temp1c) {
        temp1c[date].totalQty += 1;
      } else {
        temp1c[date] = { date, totalQty: 1 };
      }
    });

    bbdatei.forEach(({ price, date }) => {
      // const [day, month] = date.split(" ");
      if (date in temp2) {
        temp2[date].totalPrice += price;
      } else {
        temp2[date] = { date, totalPrice: price };
      }
    });

    bbdatei.forEach(({ price, date }) => {
      // const [day, month] = date.split(" ");
      if (date in temp2c) {
        temp2c[date].totalQty += 1;
      } else {
        temp2c[date] = { date, totalQty: 1 };
      }
    });

    // console.log([temp]);
    final = Object.values(temp);
    bfinal = Object.values(temp1);
    ifinal = Object.values(temp2);

    finalc = Object.values(tempc);
    bfinalc = Object.values(temp1c);
    ifinalc = Object.values(temp2c);
    // return Object.values(temp);
    // console.log(bfinalc);
    // console.log(ifinalc);

    if (bookingsData?.bookings && bookingsData?.bookings.length > 0) {
      for (const dataObj of bookingsData?.bookings) {
        bdate.push(moment(dataObj.createdAt).format("DD MMM, YYYY"));
      }

      for (const dataObj1 of bookingsData?.bookings) {
        btp.push(dataObj1.totalPrice);
      }

      data = {
        labels: [final[0]?.date],
        datasets: [
          {
            label: "Monthly Sales",
            data: [final[0]?.totalPrice],
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Monthly Onprem Sales",
            data: [ifinal[0]?.totalPrice],
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Monthly Online Sales",
            data: [bfinal[0]?.totalPrice],
            fill: false,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
        ],
      };

      datac = {
        labels: [finalc[0]?.date],
        datasets: [
          {
            label: "Monthly Bookings",
            data: [finalc[0]?.totalQty],
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: "Monthly Onprem Bookings",
            data: [ifinalc[0]?.totalQty],
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: "Monthly Online Bookings",
            data: [bfinalc[0]?.totalQty],
            fill: false,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
        ],
      };

      options = {
        scales: {
          // y: {
          //   suggestedMin: 50,
          //   // suggestedMax: 100
          // },
          xAxes: [
            {
              title: "time",
              type: "time",
              grid: {
                // lineWidth: 2,
                display: false,
              },

              ticks: {
                beginAtZero: true,
              },
              time: {
                unit: "day",
                unitStepSize: 1000,
                displayFormats: {
                  millisecond: "MMM DD",
                  second: "MMM DD",
                  minute: "MMM DD",
                  hour: "MMM DD",
                  day: "MMM DD",
                  week: "MMM DD",
                  month: "MMM DD",
                  quarter: "MMM DD",
                  year: "MMM DD",
                },
              },
            },
          ],
          yAxes: {
            suggestedMin: 200,
            ticks: {
              // beginAtZero: true,
            },
            grid: {
              // lineWidth: 2,
              display: false,
            },
          },
        },
      };

      optionsc = {
        scales: {
          // y: {
          //   suggestedMin: 50,
          //   // suggestedMax: 100
          // },
          xAxes: [
            {
              title: "time",
              type: "time",
              grid: {
                // lineWidth: 2,
                display: false,
              },

              ticks: {
                beginAtZero: true,
              },
              time: {
                unit: "day",
                unitStepSize: 1000,
                displayFormats: {
                  millisecond: "MMM DD",
                  second: "MMM DD",
                  minute: "MMM DD",
                  hour: "MMM DD",
                  day: "MMM DD",
                  week: "MMM DD",
                  month: "MMM DD",
                  quarter: "MMM DD",
                  year: "MMM DD",
                },
              },
            },
          ],
          yAxes: {
            suggestedMin: 0,
            ticks: {
              // beginAtZero: true,
            },
            grid: {
              // lineWidth: 2,
              display: false,
            },
          },
        },
      };
    }
  }
  //   }
  // }, 1000);
  // }, []);

  useEffect(() => {
    setLocations(locationsData?.locations);
  }, [locations, setLocations, locationsData]);

  useEffect(() => {
    let newDate = new Date();
    let date_raw = newDate.getDate();

    const recs =
      bookingsData.bookings &&
      bookingsData.bookings
        .filter((daily) =>
          daily.trips.find(
            (tr) =>
              moment(tr.trip.date).format("DD MMM, YYYY") ==
              moment(newDate).format("DD MMM, YYYY")
          )
        )
        .map((x) => x);
    setRecords([recs]);
  }, [bookingsData]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.fullName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  // console.log(`"data": ${data}`);

  // const addOrEdit = async (booking, resetForm) => {
  //   resetForm();
  //   setRecordForEdit(null);
  //   setOpenPopup(false);
  //   let bookingSD = await JSON.parse(localStorage.getItem("bookings"));

  //   dispatch(fetchBookings());
  //   // setRecords(vehiclesData?.vehicles);
  //   if (bookingSD?.bookings) {
  //     setRecords(bookingService.GetAllBookings());
  //   }

  //   setNotify({
  //     isOpen: true,
  //     message: "Submitted Successfully",
  //     type: "success",
  //   });
  // };

  // const openInPopup = (item) => {
  //   setRecordForEdit(item);
  //   setOpenPopup(true);
  // };

  // const onDelete = (id) => {
  //   setConfirmDialog({
  //     ...confirmDialog,
  //     isOpen: false,
  //   });
  //   vehicleService.deleteVehicle(id);
  //   setRecords(vehicleService.getAllVehicles());
  //   setNotify({
  //     isOpen: true,
  //     message: "Deleted Successfully",
  //     type: "error",
  //   });
  // };

  return (
    <main>
      <div style={{ padding: "20px 35px" }}>
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        {/* <div className="main__title">
          <img src={hello} alt="hello" />
          <div className="main__greeting">
            <h1>Hello Codersbite</h1>
            <p>Welcome to your admin dashboard</p>
          </div>
        </div> */}

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",

            gap: "20px",
            margin: "0px 50px",
            marginLeft: 0,
          }}>
          <div className="card">
            <i
              className="fa fa-suitcase fa-2x text-lightblue"
              aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Scheduled Trips</p>
              <span className="font-bold text-title">{tripsS[0]?.length}</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-suitcase fa-2x text-lightblue"
              aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Unscheduled Trips</p>
              <span className="font-bold text-title">{tripsU[0]?.length}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-bus fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Vehicles</p>
              <span className="font-bold text-title">{vehicles?.length}</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-user fa-2x text-yellow" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Drivers</p>
              <span className="font-bold text-title">{drivers[0]?.length}</span>
            </div>
          </div>

          {/* <div className="card">
            <i
              className="fa fa-map-marker fa-2x text-green"
              aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Locations</p>
              <span className="font-bold text-title">{locations?.length}</span>
            </div>
          </div> */}
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="charts">
          {/* <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div> */}

          <div className="charts__right">
            {/* <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div> */}

            <div className="charts__right__cards">
              <div className="card1">
                <h2>Total Income</h2>
                <h3 style={{ marginTop: 10 }}>GHc {totalPrice}</h3>
              </div>

              <div className="card2">
                <h2>Income-Online</h2>
                <h3 style={{ marginTop: 10 }}>GHc {totalOPrice}</h3>
              </div>

              <div className="card3">
                <h2>Income-Onprem</h2>
                <h3 style={{ marginTop: 10 }}>GHc {totalBPrice}</h3>
              </div>

              <div className="card4">
                <h2>Total Bookings</h2>
                <h3 style={{ marginTop: 10 }}>{bookings?.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="charts">
          {/* <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div>
            <Chart />
          </div> */}

          <div className="charts__right">
            {/* <div className="charts__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Cupertino, California, USA</p>
              </div>
              <i className="fa fa-usd" aria-hidden="true"></i>
            </div> */}

            <div className="charts__right__cards">
              <div className="card3">
                <h2>Bookings-Online</h2>
                <h3 style={{ marginTop: 10 }}>{ionline[0]?.length}</h3>
              </div>

              <div className="card4">
                <h2>Bookings-Onprem</h2>
                <h3 style={{ marginTop: 10 }}>{bonline[0]?.length}</h3>
              </div>

              <div className="card1">
                <h2>Income Today(Onl)</h2>
                <h3>GHc {totalTOPrice}</h3>
              </div>

              <div className="card2">
                <h2>Bookings Today(Onl)</h2>
                <h3>{iTonline[0]?.length}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="charts">
          {/* <div className="line__chart"> */}
          {bookingsData.bookings ? (
            <Line className="line__chart" data={data} options={options} />
          ) : null}

          {/* </div> */}
        </div>

        <div className="charts">
          {/* <div className="line__chart"> */}
          {bookingsData.bookings ? (
            <Line className="line__chart" data={datac} options={optionsc} />
          ) : null}

          {/* </div> */}
        </div>

        {/* <!-- CHARTS ENDS HERE --> */}
        {/* <div className="charts">
          <div className="charts__right">
            <div className="charts__left__title">
              <div>
                <h1>Daily Bookings</h1> */}
        {/* <p>Cupertino, California, USA</p> */}
        {/* </div> */}
        {/* <i className="fa fa-usd" aria-hidden="true"></i> */}
        {/* </div> */}

        {/* <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      {item.trips[0].trip.from.name} -{" "}
                      {item.trips[0].trip.to.name}
                    </TableCell>
                    <TableCell>{item._id.substring(0, 10)}</TableCell>
                    <TableCell>
                      {moment(item.trips[0].trip.date.substring(0, 10)).format(
                        "DD MMM, YYYY"
                      )}
                    </TableCell>
                    <TableCell>{item.trips[0].trip.time}</TableCell>
                    <TableCell>{item.user.name}</TableCell>
                    <TableCell>{item.user.phoneNo}</TableCell>
                    <TableCell>{item.status}</TableCell> */}
        {/* <TableCell>
                      <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openEditInPopup(item);
                        }}>
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                        color="secondary"
                        onClick={() => {
                          setConfirmDialog({
                            isOpen: true,
                            title: "Are you sure to delete this record?",
                            subTitle: "You can't undo this operation",
                            onConfirm: () => {
                              onDelete(item._id);
                            },
                          });
                        }}>
                        <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                    </TableCell> */}
        {/* </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </div> */}
        {/* <Popup
            title="Employee Form"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}>
            <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
          </Popup>
          <Notification notify={notify} setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          /> */}
      </div>
      {/* </div> */}
    </main>
  );
};

export default Main;
