import React, { useState, useEffect } from "react";
import "./Main.css";

import VehicleForm from "../VehicleForm";
import PageHeader from "../PageHeader";
import DirectionsBusOutlinedIcon from "@material-ui/icons/DirectionsBusOutlined";
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
import * as vehicleService from "../../services/vehicleService";

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
  addVehicle,
  fetchVehicles,
  deleteVehicle,
  fetchEmployees,
} from "../../redux/actions/dataActions";
import VehicleUpdateForm from "../VehicleUpdateForm";
import EditPopup from "../EditPopup";
import { useHistory } from "react-router";
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
  { id: "name", label: "Vehicle Name" },
  { id: "type", label: "Vehicle Type" },
  { id: "regNumber", label: "Registration No." },
  { id: "capacity", label: "Capacity" },
  { id: "driver", label: "Driver Name" },
  { id: "driverNo", label: "Driver Number" },
  { id: "actions", label: "Actions", disableSorting: true },
];

// const headCell1s = [
//   { id: "name", label: "Vehicle Name" },
//   { id: "type", label: "Vehicle Type" },
//   { id: "regNumber", label: "Registration No." },
//   { id: "capacity", label: "Capacity" },
//   { id: "driver", label: "Driver Name" },
// { id: "actions", label: "Actions", disableSorting: true },
// ];

const Main = () => {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const vehiclesData = useSelector((state) => state.data.vehicles);
  const Data = useSelector((state) => state.data);
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
  const [records, setRecords] = useState([]);
  // const [records, setRecords] = useState(vehicleService.getAllVehicles());

  // console.log(records);

  // const [records, setRecords] = useState([]);

  // const getdata = (e) => {
  //   e.preventDefault();
  //   dispatch(fetchVehicles());
  //   // dispatch(fetchTrips());
  //   // dispatch(fetchLocations());
  //   // dispatch(fetchEmployees());

  //   setRecords(vehiclesData?.vehicles);
  //   // e.returnValue = "";
  // };
  // if (!loading) {
  //   console.log(vehiclesData);
  // }

  // window.addEventListener("beforeunload", getdata);

  // useEffect(() => {
  // dispatch(fetchVehicles());
  // dispatch(fetchTrips());
  // dispatch(fetchLocations());
  // dispatch(fetchEmployees());

  // setRecords(vehiclesData?.vehicles);

  // let countDownDate = new Date().getTime();
  // let countDownDateSeconds =
  //   Math.floor((countDownDate % (1000 * 60)) / 1000) + 3;

  // // update every second
  // let x = setInterval(function () {
  //   // Get todays date and time
  //   let now = new Date().getTime();

  //   let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

  //   // find the distance between now and count down date
  //   let distance = countDownDateSeconds - nowSeconds;

  //   if (distance < 0) {
  //     clearInterval(x);
  //     setRecords(vehiclesData?.vehicles);
  //   }
  // }, 1000);
  // setTimeout(() => setRecords(vehiclesData?.vehicles), 5000);
  // }, [dispatch, records, setRecords]);

  // console.log(records);

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
  // let tableDetail;

  // const handleTableHook = () => {

  // tableDetail = useTable(records, headCells, filterFn);
  //   return tableDetail;
  // };

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.name.toLowerCase().includes(target.value)
          );
      },
    });
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, []);

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
    setRecords(vehiclesData?.vehicles);
  }, [setRecords, records, vehiclesData]);

  const addOrEdit = async (vehicle, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // let vehicleSD = await JSON.parse(localStorage.getItem("vehicles"));

    // dispatch(fetchVehicles());
    // // setRecords(vehiclesData?.vehicles);
    // if (vehicleSD?.vehicles) {
    //   setRecords(vehicleService.getAllVehicles());
    // }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const editOrAdd = async (vehicle, resetForm) => {
    resetForm();

    setRecordForEdit(null);
    setOpenEditPopup(false);
    // let vehicleSD = await JSON.parse(localStorage.getItem("vehicles"));

    // dispatch(fetchVehicles());
    // setRecords(vehiclesData?.vehicles);

    // if (vehicleSD?.vehicles) {
    //   setRecords(vehicleService.getAllVehicles());
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

    dispatch(deleteVehicle(id));
    // dispatch(fetchVehicles());

    {
      loading === false && dispatch(fetchVehicles());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      // setRecords(vehicleService.getAllVehicles());
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
      //   localStorage.setItem(
      //     "vehicles",
      //     JSON.stringify([vehiclesData.vehicles])
      //   );
      // const vehiclesda = JSON.parse(localStorage.getItem("vehicles"));
      // const { vehicles } = await vehiclesda;

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
      //     setRecords(vehicleService.getAllVehicles());
      //     setNotify({
      //       isOpen: true,
      //       message: "Deleted Successfully",
      //       type: "error",
      //     });
      //   }
      // }, 1000);
    }
  };

  const DataSet = [
    {
      columns: [
        {
          title: "Vehicle Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Vehicle Type",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Registration No.",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Capacity",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Driver Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Driver Number",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
      ],
      data:
        records?.length !== 0 &&
        records?.map((dat) => [
          {
            value: dat.name,
            style: { font: { sz: "14" } },
          },
          { value: dat.type, style: { font: { sz: "14" } } },
          {
            value: dat.regNumber,
            style: { font: { sz: "14" } },
          },
          { value: dat.capacity, style: { font: { sz: "14" } } },
          {
            value: `${dat.driver.firstName} ${` `} ${dat.driver.lastName}`,
            style: { font: { sz: "14" } },
          },
          {
            value: dat.driver.phoneNumber,
            style: { font: { sz: "14" } },
          },
        ]),
    },
  ];

  // console.log(records);

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Vehicle List"
          subTitle={`${name} ${` `} Vehicles`}
          icon={<DirectionsBusOutlinedIcon fontSize="large" />}
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
                      label="Search Vehicles"
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
                    datta.role === "ROLE_DRIVER" ? null : (
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
                    )
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
                  filename="Vehicles Data"
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
                  <ExcelSheet dataSet={DataSet} name="Vehicles Report" />
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.regNumber}</TableCell>
                        <TableCell>{item.capacity}</TableCell>
                        <TableCell>
                          {item.driver.firstName} {item.driver.lastName}
                        </TableCell>
                        <TableCell>{item.driver.phoneNumber}</TableCell>
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
              title="Vehicle Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <VehicleForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
            </Popup>

            <EditPopup
              title="Vehicle Update Form"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <VehicleUpdateForm
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
