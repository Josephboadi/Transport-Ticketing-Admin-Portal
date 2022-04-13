import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Main.css";

import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { Table, Button } from "react-bootstrap";
import { useBeforeunload } from "react-beforeunload";

import EmployeeForm from "../EmployeeForm";
import BookingOnlineForm from "../BookingOnlineForm";
import BookingOnlineUpdateForm from "../BookingOnlineUpdateForm";
import PageHeader from "../PageHeader";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";
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
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import { deleteBooking, fetchBookings } from "../../redux/actions/dataActions";
import EditPopup from "../EditPopup";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactExport from "react-data-export";
import GetAppIcon from "@material-ui/icons/GetApp";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
  { id: "ticketId", label: "Ticket Id" },
  { id: "date", label: "Boarding Date" },
  { id: "departure", label: "Dept. Time" },
  { id: "name", label: "Name" },
  { id: "phoneNo", label: "Phone No." },
  { id: "seatNumber", label: "Seat No." },
  { id: "status", label: "Booking Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Main = () => {
  // window.beforeunload = (e) => {
  //   console.log("Stop this");
  //   return false;
  // };

  const dispatch = useDispatch();
  const history = useHistory();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const bookingsData = useSelector((state) => state.data.bookings);
  const {
    authenticated,
    // loading,

    account: { role },
    // role,
    name,
    firstName,
    lastName,
    pic,
    address,
    imageUrl,
  } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  // const [reload, setReload] = useState(window.reload());
  // const [records, setRecords] = useState(bookingService.GetAllBookings());

  // console.log(reload);
  // console.log(loading);
  // console.log(bookingsData);

  // useEffect(() => {
  //   // dispatch(fetchBookings());
  //   setRecords(bookingService.GetAllBookings());
  // }, []);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
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

  // const handleSearch = (e) => {
  //   let target = e.target;
  //   setFilterFn({
  //     fn: (items) => {
  //       if (target.value == "") return items;
  //       else
  //         return items.filter((x) =>
  //           x.ticketId.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

  // const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  //   useTable(records, headCells, filterFn);

  // const handleSearch = (e) => {
  //   let target = e.target;
  //   setFilterFn({
  //     fn: (items) => {
  //       if (target.value == "") return items;
  //       else
  //         return items.filter((x) =>
  // x.ticketId.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        // console.log(items);
        else
          return items.filter(
            (x) => x.ticketId.toLowerCase().includes(target.value)
            // x.trips.find((tr) =>
            //   tr.trip.from.name.toLowerCase().includes(target.value)
            // )
          );
      },
    });
  };

  // if (window.performance) {
  //   console.log("window.performance works fine on this browser");
  // }
  // console.log(performance);
  // const pageRefConf = useBeforeunload((event) => {
  //   // if (preventMultiSubmit) {
  //   //   event.preventDefault()
  //   // }
  //   // event.returnValue = "";
  //   event.preventDefault();
  //   // console.Alert("disabled");
  //   // window.location.reload(history.push("/"));
  // }, false);

  // useEffect(() => {
  //   window.addEventListener("beforeunload", pageRefConf, false);

  //   return () => {
  //     window.removeEventListener("beforeunload", pageRefConf, false);
  //   };
  //   // refreshPage();
  // }, []);

  // const refreshPage = () => {
  //   // if (window.reload) {
  //   window.location.reload(history.push("/"));
  //   // }
  // };

  useEffect(() => {
    const trs =
      bookingsData?.bookings &&
      bookingsData.bookings
        .filter((daily) => daily.trips[0].trip.tripType === "Scheduled")
        .map((x) => x);

    setRecords(trs);
    // setRecords(bookingsData?.bookings);
  }, [bookingsData]);

  const addOrEdit = async (booking, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // let bookingSD = await JSON.parse(localStorage.getItem("bookings"));

    // dispatch(fetchBookings());
    // setRecords(vehiclesData?.vehicles);
    // if (bookingSD?.bookings) {
    //   setRecords(bookingService.GetAllBookings());
    // }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const editOrAdd = async (booking, resetForm) => {
    resetForm();

    setRecordForEdit(null);
    setOpenEditPopup(false);
    // let bookingSD = await JSON.parse(localStorage.getItem("bookings"));

    // if (bookingSD?.bookings) {
    //   setRecords(bookingService.GetAllBookings());
    // }

    setNotify({
      isOpen: true,
      message: "Updated Successfully",
      type: "success",
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const openEditInPopup = (item) => {
    setRecordForEdit(item);
    setOpenEditPopup(true);
  };

  const onDelete = async (id) => {
    setIsSuccessfull(true);

    dispatch(deleteBooking(id));
    // dispatch(fetchBookings());

    {
      loading === false && dispatch(fetchBookings());
      setIsSuccessfull(false);
      // setRecords(vehiclesData?.vehicles);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      // setRecords(bookingsData?.bookings);
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
      //   localStorage.setItem(
      //     "bookings",
      //     JSON.stringify([bookingsData.bookings])
      //   );
      // const bookingsda = JSON.parse(localStorage.getItem("bookings"));
      // const { bookings } = await bookingsda;

      // let countDownDate = new Date().getTime();
      // let countDownDateSeconds =
      //   Math.floor((countDownDate % (1000 * 60)) / 1000) + 4;

      // // update every second
      // let x = setInterval(function () {
      //   // Get todays date and time
      //   let now = new Date().getTime();

      //   let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

      //   // find the distance between now and count down date
      //   let distance = countDownDateSeconds - nowSeconds;

      //   if (distance < 0) {
      //     clearInterval(x);
      //     setIsSuccessfull(false);
      //     // setRecords(vehiclesData?.vehicles);
      //     setConfirmDialog({
      //       ...confirmDialog,
      //       isOpen: false,
      //     });
      //     setRecords(bookingService.GetAllBookings());
      //     setNotify({
      //       isOpen: true,
      //       message: "Deleted Successfully",
      //       type: "error",
      //     });
      //   }
      // }, 1000);
    }
  };

  // console.log(records);
  const DataSet = [
    {
      columns: [
        {
          title: "Trip Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Ticket Id",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Boarding Date",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Dept. Time",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Phone No.",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Seat No.",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Booking Status",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
      ],
      data:
        records?.length !== 0 &&
        records?.map((dat) => [
          {
            value: `${dat.trips[0].trip.from.name} ${``} ${
              dat.trips[0].trip.to.name
            }`,
            style: { font: { sz: "14" } },
          },
          { value: dat.ticketId, style: { font: { sz: "14" } } },
          {
            value: `${moment(dat.trips[0].trip.date).format("DD MMM, YYYY")}`,
            style: { font: { sz: "14" } },
          },
          { value: dat.trips[0].trip.time, style: { font: { sz: "14" } } },
          { value: dat.user.name, style: { font: { sz: "14" } } },
          { value: dat.user.phoneNo, style: { font: { sz: "14" } } },
          {
            value: dat.seatNumber,
            style: { font: { sz: "14" } },
          },
          {
            value: dat.status,
            style: { font: { sz: "14" } },
          },
        ]),
    },
  ];

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Online Bookings"
          subTitle={name}
          icon={<BookOutlinedIcon fontSize="large" />}
        />
        {/* <div className="main__title"></div> */}

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        <div className="charts">
          <div className="charts__right">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ flex: 1 }}>
                <Toolbar>
                  {records?.length == 0 ? null : (
                    <Controls.Input
                      label="Search by ticketId"
                      className={classes.searchInput}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Search />
                          </InputAdornment>
                        ),
                      }}
                      onChange={handleSearch}
                    />
                  )}
                  {/* <Controls.Button
                text="Book Ticket"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => {
                  setOpenPopup(true);
                  setRecordForEdit(null);
                }}
              /> */}
                </Toolbar>
              </div>
              {records?.length !== 0 ? (
                <ExcelFile
                  filename="Scheduled Booking Data"
                  fileExtension="xlsx"
                  element={
                    <button
                      type="button"
                      style={{
                        marginLeft: "20px",
                        marginTop: "20px",
                        outline: "none",
                        border: "none",
                        display: "flex",
                        flexDirection: "row",
                        fontSize: "15px",
                        backgroundColor: "transparent",
                        alignItems: "center",
                        color: "#394584",
                        padding: "5px",
                      }}
                      className="btn btn-success float-right">
                      <GetAppIcon
                        fontSize="medium"
                        style={{ marginRight: "4px" }}
                      />
                      Report
                    </button>
                  }>
                  <ExcelSheet
                    dataSet={DataSet}
                    name="Scheduled Booking Report"
                  />
                </ExcelFile>
              ) : null}
            </div>

            <TblContainer>
              <TblHead />
              <TableBody>
                {records?.length == 0
                  ? null
                  : // : recordsAfterPagingAndSorting()
                    recordsAfterPagingAndSorting()?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          {item.trips[0].trip.from.name} -{" "}
                          {item.trips[0].trip.to.name}
                        </TableCell>
                        <TableCell>{item.ticketId}</TableCell>
                        {/* <TableCell>{item._id.substring(0, 10)}</TableCell> */}
                        <TableCell>
                          {moment(item.trips[0].trip.date).format(
                            "DD MMM, YYYY"
                          )}
                        </TableCell>
                        <TableCell>
                          {moment(item.trips[0].trip.time).format("hh:mm A")}
                        </TableCell>
                        <TableCell>{item.user.name}</TableCell>
                        <TableCell>{item.user.phoneNo}</TableCell>
                        <TableCell>{item.seatNumber}</TableCell>
                        {item.status === "Booked" ? (
                          <TableCell className="main__statusbook">
                            {item.status}
                          </TableCell>
                        ) : item.status === "Cancelled" ? (
                          <TableCell className="main__statuscancel">
                            {item.status}
                          </TableCell>
                        ) : (
                          <TableCell className="main__statusreschedule">
                            {item.status}
                          </TableCell>
                        )}

                        <TableCell>
                          {/* {item.status} */}
                          {/* <Controls.ActionButton
                            color="primary"
                            onClick={() => {
                              openEditInPopup(item);
                            }}>
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton> */}
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
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </TblContainer>
            <TblPagination />

            <Popup
              title="Booking Form"
              subTitle="Seat No. is automatically generated. Only enter Seat No. to override the automatically generated one."
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <BookingOnlineForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
            </Popup>

            <EditPopup
              title="Booking Update Form"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <BookingOnlineUpdateForm
                recordForEdit={recordForEdit}
                editOrAdd={editOrAdd}
              />
            </EditPopup>

            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog
              disabled={loading}
              confirmDialog={confirmDialog}
              setConfirmDialog={setConfirmDialog}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
