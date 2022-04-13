import React, { useEffect, useState } from "react";
import "./Main.css";

import LocationForm from "../LocationForm";
import CompanyVerificationForm from "../CompanyVerificationForm";
import PageHeader from "../PageHeader";
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
import * as locationService from "../../services/locationService";
import Controls from "../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../Notification";
import ConfirmDialog from "../ConfirmDialog";
import {
  deleteCompany,
  deleteLocation,
  fetchCompanies,
  fetchLocations,
} from "../../redux/actions/dataActions";
import EditPopup from "../EditPopup";
import { useDispatch, useSelector } from "react-redux";
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
  { id: "name", label: "Location Name" },
  { id: "email", label: "Company Email" },
  { id: "phoneNo", label: "Phone Number" },
  { id: "isVerified", label: "Verification Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Main = () => {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const companiesData = useSelector((state) => state.data.companies);

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]);
  // const [records, setRecords] = useState(locationService.getAllLocations());
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
    setRecords(companiesData?.companies);
  }, [setRecords, records, companiesData]);

  const addOrEdit = async (location, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    // let locationSD = await JSON.parse(localStorage.getItem("locations"));

    // if (locationSD?.locations) {
    //   setRecords(locationService.getAllLocations());
    // }
    // console.log(records);

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });
  };

  const editOrAdd = async (location, resetForm) => {
    resetForm();

    setRecordForEdit(null);
    setOpenEditPopup(false);
    // let locationSD = await JSON.parse(localStorage.getItem("locations"));

    // if (locationSD?.locations) {
    //   setRecords(locationService.getAllLocations());
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

    dispatch(deleteCompany(id));

    {
      loading === false && dispatch(fetchCompanies());
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      // setRecords(locationService.getAllLocations());
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
      //   localStorage.setItem(
      //     "locations",
      //     JSON.stringify([locationsData.vehicles])
      //   );
      // const locationsda = JSON.parse(localStorage.getItem("locations"));
      // const { locations } = await locationsda;

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
      // setRecords(locationService.getAllLocations());
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
          title: "Location Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Company Email",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Phone Number",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Verification Status",
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
          { value: dat.account.email, style: { font: { sz: "14" } } },
          {
            value: dat.branches[0].address.phoneNo,
            style: { font: { sz: "14" } },
          },
          { value: dat.isVerified.toString(), style: { font: { sz: "14" } } },
        ]),
    },
  ];

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Company List"
          subTitle="Travel Gh Company Limited"
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
                      label="Search Companies"
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
                text="Add New"
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
                  filename="Companie Data"
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
                  <ExcelSheet dataSet={DataSet} name="Companies Report" />
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
                        <TableCell>{item.account.email}</TableCell>
                        <TableCell>
                          {item.branches[0].address.phoneNo}
                        </TableCell>
                        <TableCell>{item.isVerified.toString()}</TableCell>
                        {/* <TableCell>{item.mobile}</TableCell>
                    <TableCell>{item.department}</TableCell> */}
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
              title="Location Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <LocationForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
            </Popup>

            <EditPopup
              title="Company Verification Form"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <CompanyVerificationForm
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
