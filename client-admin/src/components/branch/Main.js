import React, { useState, useEffect } from "react";
import "./Main.css";

import BranchForm from "../BranchForm";
import PageHeader from "../PageHeader";
import DirectionsBusOutlinedIcon from "@material-ui/icons/DirectionsBusOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
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
import * as branchService from "../../services/branchService";

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
  fetchBranches,
  deleteBranch,
} from "../../redux/actions/dataActions";
import BranchUpdateForm from "../BranchUpdateForm";
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
  { id: "branchName", label: "Terminal/Station Name" },
  { id: "phoneNo", label: "Phone Number" },
  { id: "city", label: "Location" },
  { id: "region", label: "Region" },
  // { id: "driver", label: "Driver Name" },
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
  const branchesData = useSelector((state) => state.data.branches);
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
  const Data = useSelector((state) => state.data);
  const datta = useSelector((state) => state.auth);
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  // const [records, setRecords] = useState(branchService.getAllBranches());
  const [records, setRecords] = useState([]);

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
            x.branchName.toLowerCase().includes(target.value)
          );
      },
    });
  };

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
    setRecords(branchesData?.branches);
  }, [setRecords, records, branchesData]);

  const addOrEdit = async (branch, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // let branchSD = await JSON.parse(localStorage.getItem("branches"));

    // dispatch(fetchBranches());
    // setRecords(vehiclesData?.vehicles);
    // if (branchSD?.branches) {
    //   setRecords(branchService.getAllBranches());
    // }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const editOrAdd = async (branch, resetForm) => {
    resetForm();

    setRecordForEdit(null);
    setOpenEditPopup(false);
    // let branchSD = await JSON.parse(localStorage.getItem("branches"));

    // dispatch(fetchBranches());

    // if (branchSD?.branches) {
    //   setRecords(branchService.getAllBranches());
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

    dispatch(deleteBranch(id));

    {
      loading === false && dispatch(fetchBranches());
      setIsSuccessfull(false);
      // setRecords(vehiclesData?.vehicles);
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      // setRecords(branchService.getAllBranches());
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
      //   localStorage.setItem(
      //     "branches",
      //     JSON.stringify([branchesData.branches])
      //   );
      // const branchesda = JSON.parse(localStorage.getItem("branches"));
      // const { branches } = await branchesda;

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
      //     setRecords(branchService.getAllBranches());
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
          title: "Branch Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Phone Number",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "City",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Region",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
      ],
      data:
        records?.length !== 0 &&
        records?.map((dat) => [
          {
            value: dat.branchName,
            style: { font: { sz: "14" } },
          },
          { value: dat.address.phoneNo, style: { font: { sz: "14" } } },

          { value: dat.address.city, style: { font: { sz: "14" } } },
          { value: dat.address.region, style: { font: { sz: "14" } } },
          // { value: dat.user.phoneNo, style: { font: { sz: "14" } } },
          // {
          //   value: dat.seatNumber,
          //   style: { font: { sz: "14" } },
          // },
        ]),
    },
  ];

  // console.log(records);

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Terminal/Station List"
          subTitle={`${name} ${` `} Terminal `}
          icon={<BusinessOutlinedIcon fontSize="large" />}
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
                      label="Search Terminal/Station"
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
                    datta?.role === "ROLE_DRIVER" ? null : (
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
                  filename="Branches Data"
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
                  <ExcelSheet dataSet={DataSet} name="Branches Report" />
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
                        <TableCell>{item.branchName}</TableCell>
                        <TableCell>{item.address.phoneNo}</TableCell>
                        <TableCell>{item.address.city}</TableCell>
                        <TableCell>{item.address.region}</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </TblContainer>
            <TblPagination />

            <Popup
              title="Teminal/Station Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <BranchForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Popup>

            <EditPopup
              title="Terminal/Station Update Form"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <BranchUpdateForm
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
