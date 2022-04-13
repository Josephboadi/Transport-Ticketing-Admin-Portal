import React, { useEffect, useState } from "react";
import "./Main.css";

// import LocationForm from "../LocationForm";
import RefundUpdateForm from "../RefundUpdateForm";
import PageHeader from "../PageHeader";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
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
  // deleteLocation,
  fetchRefunds,
} from "../../redux/actions/dataActions";
import EditPopup from "../EditPopup";
import { useDispatch, useSelector } from "react-redux";
// import { CSVLink, CSVDownload } from "react-csv";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useBeforeunload } from "react-beforeunload";
import ReactExport from "react-data-export";

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
  { id: "ticketId", label: "Ticket Id" },
  { id: "customerName", label: "Customer Name" },
  { id: "customerEmail", label: "Customer Email" },
  { id: "customerNumber", label: "Customer Number" },
  { id: "trip", label: "Trip Name/Date/Time" },
  { id: "amount", label: "Trip Fare" },
  { id: "paymentId", label: "Payment Id" },
  { id: "refundPaid", label: "Payment Status" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const headdata = [
  { label: "Customer Name", key: "customerName" },
  { label: "Ticket Id", key: "ticketId" },
  { label: "Customer Email", key: "customerEmail" },
  { label: "Customer Number", key: "customerNumber" },
  { label: "Trip ", key: "trip" },
  { label: "Trip Fare", key: "amount" },
];

const Main = () => {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const refundsData = useSelector((state) => state.data.refunds);
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
  const [record, setRecord] = useState([]);
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
            x.ticketId.toLowerCase().includes(target.value)
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
    setRecords(refundsData?.refunds);
    // const data = refundsData?.refunds;
    // console.log(data);
    // setRecord([data]);
  }, [setRecords, records, refundsData]);

  // const addOrEdit = async (location, resetForm) => {
  //   resetForm();
  //   setRecordForEdit(null);
  //   setOpenPopup(false);
  //   // let locationSD = await JSON.parse(localStorage.getItem("locations"));

  //   // if (locationSD?.locations) {
  //   //   setRecords(locationService.getAllLocations());
  //   // }

  //   setNotify({
  //     isOpen: true,
  //     message: "Submitted Successfully",
  //     type: "success",
  //   });
  // };

  const editOrAdd = async (refund, resetForm) => {
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

  // const onDelete = async (id) => {
  //   setIsSuccessfull(true);

  //   dispatch(deleteLocation(id));

  //   {
  //     loading === false && dispatch(fetchLocations());
  //     setConfirmDialog({
  //       ...confirmDialog,
  //       isOpen: false,
  //     });
  //     // setRecords(locationService.getAllLocations());
  //     setNotify({
  //       isOpen: true,
  //       message: "Deleted Successfully",
  //       type: "error",
  //     });
  //     //   localStorage.setItem(
  //     //     "locations",
  //     //     JSON.stringify([locationsData.vehicles])
  //     //   );
  //     // const locationsda = JSON.parse(localStorage.getItem("locations"));
  //     // const { locations } = await locationsda;

  //     // let countDownDate = new Date().getTime();
  //     // let countDownDateSeconds =
  //     //   Math.floor((countDownDate % (1000 * 60)) / 1000) + 4;

  //     // // update every second
  //     // let x = setInterval(function () {
  //     //   // Get todays date and time
  //     //   let now = new Date().getTime();

  //     //   let nowSeconds = Math.floor((now % (1000 * 60)) / 1000);

  //     //   // find the distance between now and count down date
  //     //   let distance = countDownDateSeconds - nowSeconds;

  //     //   if (distance < 0) {
  //     //     clearInterval(x);
  //     //     setIsSuccessfull(false);
  //     // setConfirmDialog({
  //     //   ...confirmDialog,
  //     //   isOpen: false,
  //     // });
  //     // setRecords(locationService.getAllLocations());
  //     // setNotify({
  //     //   isOpen: true,
  //     //   message: "Deleted Successfully",
  //     //   type: "error",
  //     // });
  //     //   }
  //     // }, 1000);
  //   }
  // };

  // console.log(records);
  const DataSet = [
    {
      columns: [
        {
          title: "Ticket Id",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Customer Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Customer Email",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Customer Number",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Trip Name/Date/Time",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Trip Fare",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Payment Id",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Payment Status",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
      ],
      data:
        records?.length !== 0 &&
        records?.map((dat) => [
          { value: dat.ticketId, style: { font: { sz: "14" } } },
          { value: dat.customerName, style: { font: { sz: "14" } } },
          { value: dat.customerEmail, style: { font: { sz: "14" } } },
          { value: dat.customerNumber, style: { font: { sz: "14" } } },
          { value: dat.trip, style: { font: { sz: "14" } } },
          { value: dat.amount, style: { font: { sz: "14" } } },
          {
            value: dat.paymentId ? dat.paymentId : "null",
            style: { font: { sz: "14" } },
          },
          { value: dat.refundPaid, style: { font: { sz: "14" } } },
        ]),
    },
  ];

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Refund Request"
          subTitle={name}
          icon={<PaymentOutlinedIcon fontSize="large" />}
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
                  filename="Refund Data"
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
                  <ExcelSheet dataSet={DataSet} name="Refund Report" />
                </ExcelFile>
              ) : null}
            </div>

            <TblContainer>
              <TblHead />
              <TableBody id="table-to-xls">
                {records?.length == 0
                  ? null
                  : recordsAfterPagingAndSorting()?.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>{item.ticketId}</TableCell>
                        <TableCell>{item.customerName}</TableCell>
                        <TableCell>{item.customerEmail}</TableCell>
                        <TableCell>{item.customerNumber}</TableCell>
                        <TableCell>{item.trip}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.paymentId}</TableCell>
                        <TableCell>{item.refundPaid.toString()}</TableCell>
                        <TableCell>
                          <Controls.ActionButton
                            color="primary"
                            onClick={() => {
                              openEditInPopup(item);
                            }}>
                            <EditOutlinedIcon fontSize="small" />
                          </Controls.ActionButton>
                          {/* <Controls.ActionButton
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
                          </Controls.ActionButton> */}
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </TblContainer>
            <TblPagination />

            {/* <Popup
              title="Location Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <LocationForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
            </Popup> */}

            <EditPopup
              title="Pay Refund"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <RefundUpdateForm
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
