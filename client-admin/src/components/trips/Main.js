import React, { useEffect, useState } from "react";
import moment from "moment";
import "./Main.css";

import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { Table, Button } from "react-bootstrap";

import TripForm from "../TripForm";
import TripUpdateForm from "../TripUpdateForm";
import PageHeader from "../PageHeader";
import CardTravelOutlinedIcon from "@material-ui/icons/CardTravelOutlined";
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
import * as tripService from "../../services/tripService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTrip,
  fetchBranches,
  fetchLocations,
  fetchTrips,
  fetchVehicles,
} from "../../redux/actions/dataActions";
import EditPopup from "../EditPopup";
import { useBeforeunload } from "react-beforeunload";
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
  { id: "tripName", label: "Trip Name" },
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "fare", label: "Fare" },
  { id: "ticketsCount", label: "Rem. tickets" },
  { id: "vehicle", label: "Vehicle" },
  { id: "tripType", label: "Trip Type" },
  { id: "status", label: "Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Main = () => {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const tripsData = useSelector((state) => state.data.shtrips);
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
  const datta = useSelector((state) => state.auth);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [records, setRecords] = useState([]);
  // const [records, setRecords] = useState(tripService.getAllTrips());

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
            x.from.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    dispatch(fetchVehicles());
    dispatch(fetchBranches());
    dispatch(fetchLocations());
  }, []);

  console.log(tripsData);
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
    // dispatch(fetchBookings());
    // window.location.reload(history.push("/"));
    setRecords(tripsData?.trips);
  }, [setRecords, records, tripsData]);

  const addOrEdit = async (trip, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // let tripSD = await JSON.parse(localStorage.getItem("trips"));

    // if (tripSD?.trips) {
    //   setRecords(tripService.getAllTrips());
    // }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const editOrAdd = async (trip, resetForm) => {
    resetForm();

    setRecordForEdit(null);
    setOpenEditPopup(false);
    // let tripSD = await JSON.parse(localStorage.getItem("trips"));

    // if (tripSD?.trips) {
    //   setRecords(tripService.getAllTrips());
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

    dispatch(deleteTrip(id));

    {
      loading === false && dispatch(fetchTrips());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      // setRecords(tripService.getAllTrips());
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
      //   localStorage.setItem("trips", JSON.stringify([tripsData.trips]));
      // const tripsda = JSON.parse(localStorage.getItem("trips"));
      // const { trips } = await tripsda;

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
      // setConfirmDialog({
      //   ...confirmDialog,
      //   isOpen: false,
      // });
      // setRecords(tripService.getAllTrips());
      // setNotify({
      //   isOpen: true,
      //   message: "Deleted Successfully",
      //   type: "error",
      // });
      //   }
      // }, 1000);
    }
  };

  const DataSet = [
    {
      columns: [
        {
          title: "Trip Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Date",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Time",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Fare",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Rem. Tickets",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Vehicle",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Trip Type",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Status",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
      ],
      data:
        records?.length !== 0 &&
        records?.map((dat) => [
          {
            value: `${dat.from.name} ${` - `} ${dat.to.name}`,
            style: { font: { sz: "14" } },
          },
          {
            value: `${moment(dat.date).format("DD MMM, YYYY")}`,
            style: { font: { sz: "14" } },
          },
          {
            value: dat.time,
            style: { font: { sz: "14" } },
          },
          { value: dat.fare, style: { font: { sz: "14" } } },
          { value: dat.ticketsCount, style: { font: { sz: "14" } } },
          { value: dat.vehicle.name, style: { font: { sz: "14" } } },
          { value: dat.tripType, style: { font: { sz: "14" } } },
          { value: dat.status, style: { font: { sz: "14" } } },
        ]),
    },
  ];

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Trip List"
          subTitle={`${name} ${` `} Trips`}
          icon={<CardTravelOutlinedIcon fontSize="large" />}
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
                      label="Search Trips"
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
                  {datta?.role ? (
                    datta.role === "ROLE_ADMIN" ? (
                      <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => {
                          setOpenPopup(true);
                          setRecordForEdit(null);
                        }}
                      />
                    ) : null
                  ) : (
                    <Controls.Button
                      text="Add New"
                      variant="outlined"
                      startIcon={<AddIcon />}
                      className={classes.newButton}
                      onClick={() => {
                        setOpenPopup(true);
                        setRecordForEdit(null);
                      }}
                    />
                  )}
                </Toolbar>
              </div>
              {records?.length !== 0 ? (
                <ExcelFile
                  filename="Trips Data"
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
                  <ExcelSheet dataSet={DataSet} name="Trips Report" />
                </ExcelFile>
              ) : null}
            </div>

            <TblContainer>
              <TblHead />
              <TableBody>
                {records?.length == 0
                  ? null
                  : recordsAfterPagingAndSorting()?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          {item.from.name} - {item.to.name}
                        </TableCell>
                        <TableCell>
                          {moment(item.date).format("DD MMM, YYYY")}
                          {/* {item.date} */}
                        </TableCell>
                        <TableCell>
                          {moment(item.time).format("hh:mm A")}
                        </TableCell>
                        <TableCell>{item.fare}</TableCell>
                        <TableCell>{item.ticketsCount}</TableCell>
                        <TableCell>{item.vehicle.name}</TableCell>
                        <TableCell>{item.tripType} </TableCell>
                        <TableCell>
                          {/* <Controls.ActionButton
                        color="primary"
                        onClick={() => {
                          openInPopup(item);
                        }}>
                        <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>{" "} */}
                          {item.status}
                        </TableCell>
                        <TableCell>
                          {datta.role ? (
                            datta.role === "ROLE_DRIVER" ? null : (
                              <>
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
                                      title:
                                        "Are you sure to delete this record?",
                                      subTitle: "You can't undo this operation",
                                      onConfirm: () => {
                                        onDelete(item._id);
                                      },
                                    });
                                  }}>
                                  <CloseIcon fontSize="small" />
                                </Controls.ActionButton>
                              </>
                            )
                          ) : (
                            <>
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
                                    title:
                                      "Are you sure to delete this record?",
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {
                                      onDelete(item._id);
                                    },
                                  });
                                }}>
                                <CloseIcon fontSize="small" />
                              </Controls.ActionButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </TblContainer>
            <TblPagination />

            <Popup
              title="Add Trip Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <TripForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Popup>

            <EditPopup
              title="Update Trip Form"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <TripUpdateForm
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
