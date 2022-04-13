import React, { useEffect, useState } from "react";
import "./Main.css";

import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { Table, Button } from "react-bootstrap";

import EmployeeForm from "../EmployeeForm";
import EmployeeUpdateForm from "../EmployeeUpdateForm";
import PageHeader from "../PageHeader";
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
import * as employeeService from "../../services/employeeService";
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
  deleteEmployee,
  fetchEmployees,
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
  { id: "fullName", label: "Employee Name" },
  ,
  { id: "email", label: "Email Address (Personal)" },
  { id: "phoneNumber", label: "Phone Number" },
  { id: "gender", label: "Gender" },
  { id: "role", label: "Role" },
  { id: "actions", label: "Actions", disableSorting: true },
];

// const waitForLocalStorage = (key, cb, timer) => {
//   if (!localStorage.getItem(key))
//     return (timer = setTimeout(waitForLocalStorage.bind(null, key, cb), 5000));
//   clearTimeout(timer);
//   if (typeof cb !== "function") return localStorage.getItem(key);
//   return cb(localStorage.getItem(key));
// };

const Main = () => {
  const dispatch = useDispatch();
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const { loading } = useSelector((state) => state.data);
  const [deData, setDedata] = useState(null);
  const employeesData = useSelector((state) => state.data.employees);
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
  // const [records, setRecords] = useState(employeeService.getAllEmployees());
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
          return items.filter(
            (x) =>
              x.firstName.toLowerCase().includes(target.value) ||
              x.lastName.toLowerCase().includes(target.value)
          );
      },
    });
  };

  let employeeSD;

  // useEffect(() => {
  //   if (!deData || deData !== null) {
  //     setIsSuccessfull(false);
  //     // setIsSuccessfull(true);
  //     // setRecords(employeeService.getAllEmployees());
  //   } else {
  //     setIsSuccessfull(true);
  //     // setRecords(employeeService.getAllEmployees());
  //   }
  // }, [deData, records]);

  // console.log(deData);

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
    setRecords(employeesData?.employees);
  }, [setRecords, records, employeesData]);

  const addOrEdit = async (employee, resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);

    // waitForLocalStorage("employees", function (value) {
    //   console.log("coolProperty", JSON.parse(value));
    // });

    // employeeSD = await JSON.parse(localStorage.getItem("employees"));
    // const { employees } = employeeSD;

    // console.log(employeeSD);

    // setDedata(employeeSD?.employees);

    // if (employeeSD?.employees) {
    // setRecords(employeeService.getAllEmployees());
    // }

    setNotify({
      isOpen: true,
      message: "Submitted Successfully",
      type: "success",
    });

    // if (deData != null) {
    //   setRecords(employeeService.getAllEmployees());
    //   setNotify({
    //     isOpen: true,
    //     message: "Submitted Successfully",
    //     type: "success",
    //   });
    // }
    //  else if (isSuccessfull == false) {
    //   return null;
    // } else if (){
    //   setRecords(employeeService.getAllEmployees());
    //   setNotify({
    //     isOpen: true,
    //     message: "Submitted Successfully",
    //     type: "success",
    //   });
    // }
  };

  const editOrAdd = async (employee, resetForm) => {
    resetForm();

    setRecordForEdit(null);
    setOpenEditPopup(false);
    // employeeSD = await JSON.parse(localStorage.getItem("employees"));

    // if (employeeSD?.employees) {
    //   setRecords(employeeService.getAllEmployees());
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

    dispatch(deleteEmployee(id));

    {
      loading === false && dispatch(fetchEmployees());

      setConfirmDialog({
        ...confirmDialog,
        isOpen: false,
      });
      // setRecords(employeeService.getAllEmployees());
      setNotify({
        isOpen: true,
        message: "Deleted Successfully",
        type: "error",
      });
      //   localStorage.setItem(
      //     "employees",
      //     JSON.stringify([employeesData.employees])
      //   );
      // employeeSD = JSON.parse(localStorage.getItem("employees"));
      // const { employees } = await employeeSD;

      // if (isSuccessfull === null) {
      //   return null;
      // } else if (isSuccessfull == false) {
      //   return null;
      // } else {
      //   setRecords(employeeService.getAllEmployees());
      //   setNotify({
      //     isOpen: true,
      //     message: "Deleted Successfully",
      //     type: "error",
      //   });
      // }

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

      //   }
      // }, 1000);
    }
  };

  const DataSet = [
    {
      columns: [
        {
          title: "Employee Name",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Email Address (Personal)",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Phone Number",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
        {
          title: "Gender",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 100 },
        },
        {
          title: "Role",
          style: { font: { sz: "18", bold: true } },
          width: { wpx: 125 },
        },
      ],
      data:
        records?.length !== 0 &&
        records?.map((dat) => [
          {
            value: `${dat.firstName} ${` `} ${dat.lastName}`,
            style: { font: { sz: "14" } },
          },
          { value: dat.account.email, style: { font: { sz: "14" } } },
          {
            value: dat.phoneNumber,
            style: { font: { sz: "14" } },
          },
          { value: dat.gender, style: { font: { sz: "14" } } },
          { value: dat.account.role, style: { font: { sz: "14" } } },
        ]),
    },
  ];

  // if (isSuccessfull) {
  //   setRecords(employeeService.getAllEmployees());
  //   setNotify({
  //     isOpen: true,
  //     message: "Submitted Successfully",
  //     type: "success",
  //   });
  // }

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader
          title="Employee List"
          subTitle={`${name} ${` `} Employees`}
          icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
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
                      label="Search Employees"
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
                </Toolbar>
              </div>
              {records?.length !== 0 ? (
                <ExcelFile
                  filename="Employees Data"
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
                  <ExcelSheet dataSet={DataSet} name="Employee Report" />
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
                          {item.firstName} {item.lastName}
                        </TableCell>
                        <TableCell>{item.account.email}</TableCell>
                        <TableCell>{item.phoneNumber}</TableCell>
                        <TableCell>{item.gender}</TableCell>
                        <TableCell>{item.account.role}</TableCell>
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
              title="Employee Form"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}>
              <EmployeeForm
                recordForEdit={recordForEdit}
                addOrEdit={addOrEdit}
              />
            </Popup>

            <EditPopup
              title="Employee Update Form"
              openEditPopup={openEditPopup}
              setOpenEditPopup={setOpenEditPopup}>
              <EmployeeUpdateForm
                // employeesData={employeesData}
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
