import React, { useEffect, useState } from "react";
import "./Main.css";

import hello from "../../assets/hello.svg";
import Chart from "../charts/Chart";
import { Table, Button } from "react-bootstrap";

// import PersonalAccountForm from "../PersonalAccountForm";
import PageHeader1 from "../PageHeader1";
// import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
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
import { useBeforeunload } from "react-beforeunload";
import { useSelector } from "react-redux";
import moment from "moment";

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

// const headCells = [
//   { id: "fullName", label: "Employee Name" },
//   { id: "email", label: "Email Address (Personal)" },
//   { id: "mobile", label: "Mobile Number" },
//   { id: "department", label: "Department" },
//   { id: "actions", label: "Actions", disableSorting: true },
// ];

const Main = () => {
  const classes = useStyles();
  // const { loading } = useSelector((state) => state.data);
  const complaintsData = useSelector((state) => state.data.complaints);
  // const [recordForEdit, setRecordForEdit] = useState(null);
  // const [records, setRecords] = useState(employeeService.getAllEmployees());
  const [records, setRecords] = useState([]);
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

  useEffect(() => {
    setRecords(complaintsData?.complaints);
  }, [setRecords, records, complaintsData]);

  // console.log(records);
  // const [filterFn, setFilterFn] = useState({
  //   fn: (items) => {
  //     return items;
  //   },
  // });
  // const [openPopup, setOpenPopup] = useState(false);
  // const [notify, setNotify] = useState({
  //   isOpen: false,
  //   message: "",
  //   type: "",
  // });
  // const [confirmDialog, setConfirmDialog] = useState({
  //   isOpen: false,
  //   title: "",
  //   subTitle: "",
  // });

  // const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
  //   useTable(records, headCells, filterFn);

  // const handleSearch = (e) => {
  //   let target = e.target;
  //   setFilterFn({
  //     fn: (items) => {
  //       if (target.value == "") return items;
  //       else
  //         return items.filter((x) =>
  //           x.fullName.toLowerCase().includes(target.value)
  //         );
  //     },
  //   });
  // };

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

  // const addOrEdit = (employee, resetForm) => {
  //   // if (employee.id == 0) employeeService.insertEmployee(employee);
  //   // else employeeService.updateEmployee(employee);
  //   resetForm();
  //   setRecordForEdit(null);
  //   setOpenPopup(false);
  //   setRecords(employeeService.getAllEmployees());
  //   setNotify({
  //     isOpen: true,
  //     message: "Submitted Successfully",
  //     type: "success",
  //   });
  // };

  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}
        <PageHeader1
          title="Customer Complaints"
          subTitle={name}
          icon={<MessageOutlinedIcon fontSize="large" />}
        />
        {/* <div className="main__title"></div> */}

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        <div
          style={{
            width: "auto",
            maxWidth: 1000,
            // height: 700,
            maxHeight: 500,
            overflowY: "scroll",
            overflowX: "hidden",
            padding: 20,
            paddingRight: 50,
            // marginRight: 40,
          }}>
          {records
            ? records?.map((compl, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "auto",
                    backgroundColor: "#fff",
                    boxShadow: "5px 5px 13px #ededed",
                    borderTopLeftRadius: 70,
                    borderTopRightRadius: 70,
                    borderBottomLeftRadius: 70,
                    padding: 15,
                    marginTop: 20,
                    justifyContent: "flex-start",
                    // marginRight: 50,
                  }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 10,
                      paddingLeft: 20,
                      paddingRight: 20,
                      justifyContent: "space-between",
                    }}>
                    <h4>{compl.name}</h4>
                    <h4>{moment(compl.createdAt).fromNow()}</h4>
                  </div>
                  <span
                    style={{
                      marginLeft: 30,
                      marginRight: 20,
                      marginBottom: 10,
                      // alignSelf: "center",
                    }}>
                    {compl.complaint}
                  </span>
                </div>
              ))
            : null}
        </div>
      </div>
    </main>
  );
};

export default Main;
