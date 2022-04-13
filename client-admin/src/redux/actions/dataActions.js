import {
  SET_CLIENTS,
  LOADING_DATA,
  SET_CLIENT,
  SET_AVAILABLE_TRIPS,
  SET_AVAILABLE_TRIP,
  SET_TRIPS,
  SET_TRIP,
  LOADING_UI,
  SET_ERROR_TRIP,
  SERVER_ERROR,
  CLEAR_ERRORS,
  ADD_TRIP,
  DELETE_TRIP,
  EDIT_TRIP,
  ADD_VEHICLE,
  DELETE_VEHICLE,
  EDIT_VEHICLE,
  SET_ERROR_VEHICLE,
  SET_ERROR_EMPLOYEE,
  SET_ERROR_COMPANY,
  SET_ERROR_USER_BOOKING,
  ADD_LOCATION,
  DELETE_LOCATION,
  EDIT_LOCATION,
  SET_ERROR_LOCATION,
  ADD_CART_SUCCESS,
  ADD_BOOKING_SUCCESS,
  UPDATE_TICKETSCOUNT_SUCCESS,
  ADD_CART_FAIL,
  SET_CART,
  DELETE_TRIP_CART,
  SET_ERRORS,
  SET_BOOKINGS,
  SET_BOOKING,
  EDIT_STATUS,
  SET_VEHICLES,
  SET_VEHICLE,
  SET_LOCATIONS,
  SET_LOCATION,
  SET_EMPLOYEE,
  SET_EMPLOYEES,
  ADD_EMPLOYEE,
  DELETE_EMPLOYEE,
  EDIT_EMPLOYEE,
  SET_USER_BOOKING,
  SET_USER_BOOKINGS,
  ADD_USER_BOOKING,
  DELETE_USER_BOOKING,
  EDIT_USER_BOOKING,
  DELETE_COMPANY,
  EDIT_COMPANY,
  SET_COMPANY,
  SET_COMPANY_BRANCHES,
  SET_COMPANY_BRANCH,
  ADD_COMPANY_BRANCH,
  SET_ERROR_COMPANY_BRANCH,
  DELETE_COMPANY_BRANCH,
  EDIT_COMPANY_BRANCH,
  SET_PAYMENTACCOUNT,
  SET_PAYMENTACCOUNTS,
  ADD_PAYMENTACCOUNT,
  SET_ERROR_PAYMENTACCOUNT,
  DELETE_PAYMENTACCOUNT,
  EDIT_PAYMENTACCOUNT,
  SET_COMPANIES,
  VERIFY_COMPANY,
  EDIT_PAYACCOUNT,
  SET_SUPER_CLIENTS,
  SET_REFUNDS,
  SET_REFUND,
  SET_ERROR_REFUND,
  EDIT_REFUND,
  SET_SCH_TRIPS,
  SET_COMPLAINTS,
  SET_COMPLAINT,
} from "../types";
import axios from "../../util/axios";
import axiosNewInstance from "axios";
import { getUserData } from "./authActions";

export const fetchClients = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/clients")
    .then((res) => {
      dispatch({
        type: SET_CLIENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_CLIENTS,
        payload: [],
      });
    });
};

export const fetchSuperClients = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/superclients")
    .then((res) => {
      dispatch({
        type: SET_SUPER_CLIENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_SUPER_CLIENTS,
        payload: [],
      });
    });
};

export const fetchCompanies = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/company/get-companies")
    .then((res) => {
      dispatch({
        type: SET_COMPANIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_COMPANIES,
        payload: [],
      });
    });
};

export const fetchBookings = () => async (dispatch) => {
  // dispatch({ type: LOADING_DATA });
  await axios
    .get("/booking/get-bookings")
    .then(async (res) => {
      dispatch({
        type: SET_USER_BOOKINGS,
        payload: res.data,
      });
      // await localStorage.setItem("bookings", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_USER_BOOKINGS,
        payload: [],
      });
    });
};

export const fetchVehicles = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/vehicle/get-vehicles")
    .then(async (res) => {
      dispatch({
        type: SET_VEHICLES,
        payload: res.data,
      });
      // await localStorage.setItem("vehicles", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_VEHICLES,
        payload: [],
      });
    });
};

export const fetchRefunds = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/refund/get-refunds")
    .then(async (res) => {
      dispatch({
        type: SET_REFUNDS,
        payload: res.data,
      });
      // await localStorage.setItem("locations", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_REFUNDS,
        payload: [],
      });
    });
};

export const fetchLocations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/location/get-locations")
    .then(async (res) => {
      dispatch({
        type: SET_LOCATIONS,
        payload: res.data,
      });
      // await localStorage.setItem("locations", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_LOCATIONS,
        payload: [],
      });
    });
};

export const fetchComplaints = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/complaint/get-complaints")
    .then(async (res) => {
      dispatch({
        type: SET_COMPLAINTS,
        payload: res.data,
      });
      // await localStorage.setItem("locations", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_COMPLAINTS,
        payload: [],
      });
    });
};

export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/employee/get-employees")
    .then(async (res) => {
      dispatch({
        type: SET_EMPLOYEES,
        payload: res.data,
      });
      // await localStorage.setItem("employees", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_EMPLOYEES,
        payload: [],
      });
    });
};

export const fetchClientsByAddress = (lat, lng) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/clients-location/${lat}/${lng}`)
    .then((res) => {
      dispatch({
        type: SET_CLIENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // console.log(err);
      dispatch({
        type: SET_CLIENTS,
        payload: [],
      });
    });
};

export const fetchClient = (compId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/client/${compId}`)
    .then((res) => {
      dispatch({
        type: SET_CLIENT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_CLIENT,
        payload: {},
      });
    });
};

export const fetchBooking = (bookId) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get(`/booking/get-booking/${bookId}`)
    .then((res) => {
      dispatch({
        type: SET_USER_BOOKING,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_USER_BOOKING,
        payload: {},
      });
    });
};

export const fetchVehicle = (vehId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/vehicle/get-vehicle/${vehId}`)
    .then((res) => {
      dispatch({
        type: SET_VEHICLE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_VEHICLE,
        payload: {},
      });
    });
};

export const fetchLocation = (locId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/location/get-location/${locId}`)
    .then((res) => {
      dispatch({
        type: SET_LOCATION,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_LOCATION,
        payload: {},
      });
    });
};

export const fetchComplaint = (complaintId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/complaint/get-complaint/${complaintId}`)
    .then((res) => {
      dispatch({
        type: SET_COMPLAINT,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_COMPLAINT,
        payload: {},
      });
    });
};

export const fetchRefund = (refId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/refund/get-refund/${refId}`)
    .then((res) => {
      dispatch({
        type: SET_REFUND,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_REFUND,
        payload: {},
      });
    });
};

export const fetchEmployee = (empId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/employee/get-employee/${empId}`)
    .then((res) => {
      dispatch({
        type: SET_EMPLOYEE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_EMPLOYEE,
        payload: {},
      });
    });
};

export const fetchCompany = (companyId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/company/get-company/${companyId}`)
    .then((res) => {
      dispatch({
        type: SET_COMPANY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_COMPANY,
        payload: {},
      });
    });
};

export const fetchAvailableTrips = (compId, tripData) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .post(`/client/availableTrip/${compId}`, tripData)
    .then((res) => {
      dispatch({
        type: SET_AVAILABLE_TRIPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_AVAILABLE_TRIPS,
        payload: {},
      });
    });
};

export const fetchBranches = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/branch/get-branches")
    .then(async (res) => {
      dispatch({
        type: SET_COMPANY_BRANCHES,
        payload: res.data,
      });
      // await localStorage.setItem("branches", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_COMPANY_BRANCHES,
        payload: [],
      });
    });
};

export const fetchPaymentAccounts = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/paymentaccount/get-paymentAccounts")
    .then(async (res) => {
      dispatch({
        type: SET_PAYMENTACCOUNTS,
        payload: res.data,
      });
      // await localStorage.setItem("paymentaccounts", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_PAYMENTACCOUNTS,
        payload: [],
      });
    });
};

export const fetchSchTrips = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/trip/get-schtrips")
    .then(async (res) => {
      dispatch({
        type: SET_SCH_TRIPS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_SCH_TRIPS,
        payload: [],
      });
    });
};

export const fetchTrips = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get("/trip/get-trips")
    .then(async (res) => {
      dispatch({
        type: SET_TRIPS,
        payload: res.data,
      });
      // await localStorage.setItem("trips", JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_TRIPS,
        payload: [],
      });
    });
};

export const fetchAvailableTrip = (history, tripId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/trip/${tripId}`)
    .then((res) => {
      dispatch({
        type: SET_AVAILABLE_TRIP,
        payload: res.data,
      });
      // localStorage.setItem("tripInfo", JSON.stringify(res.data));
      // history.push(`/trip/${tripId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_AVAILABLE_TRIP,
        payload: {},
      });
    });
};

export const fetchPaymentAccount = (paymentAccountId) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get(`/paymentaccount/get-paymentAccount/${paymentAccountId}`)
    .then((res) => {
      dispatch({
        type: SET_PAYMENTACCOUNT,
        payload: res.data,
      });
      // localStorage.setItem("tripInfo", JSON.stringify(res.data));
      // history.push(`/trip/${tripId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_PAYMENTACCOUNT,
        payload: {},
      });
    });
};

export const fetchBranch = (branchId) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get(`/branch/get-branch/${branchId}`)
    .then((res) => {
      dispatch({
        type: SET_COMPANY_BRANCH,
        payload: res.data,
      });
      // localStorage.setItem("tripInfo", JSON.stringify(res.data));
      // history.push(`/trip/${tripId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_COMPANY_BRANCH,
        payload: {},
      });
    });
};

export const fetchTrip = (tripId) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  await axios
    .get(`/trip/get-trip/${tripId}`)
    .then((res) => {
      dispatch({
        type: SET_TRIP,
        payload: res.data,
      });
      // localStorage.setItem("tripInfo", JSON.stringify(res.data));
      // history.push(`/trip/${tripId}`);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: SET_TRIP,
        payload: {},
      });
    });
};

export const addBranch = (branchData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/branch/create-branch`, branchData)
    .then((res) => {
      dispatch({
        type: ADD_COMPANY_BRANCH,
        payload: res.data.branch,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_COMPANY_BRANCH,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteBranch = (branchId) => (dispatch) => {
  axios
    .delete(`/branch/delete-branch/${branchId}`)
    .then((res) => {
      dispatch({
        type: DELETE_COMPANY_BRANCH,
        payload: branchId,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const verifyCompanyAccount = (verifyData, companyId) => (dispatch) => {
  axios
    .put(`/company/verify-company/${companyId}`, verifyData)
    .then((res) => {
      dispatch({
        type: VERIFY_COMPANY,
        payload: res.data.company,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_COMPANY,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const editRefund = (refundData, refundId, bookingId) => (dispatch) => {
  axios
    .put(`/refund/edit-refund/${refundId}/${bookingId}`, refundData)
    .then((res) => {
      dispatch({
        type: EDIT_REFUND,
        payload: res.data.refund,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_REFUND,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const editBranch = (branchData, branchId) => (dispatch) => {
  axios
    .put(`/branch/edit-branch/${branchId}`, branchData)
    .then((res) => {
      dispatch({
        type: EDIT_COMPANY_BRANCH,
        payload: res.data.branch,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_COMPANY_BRANCH,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addPaymentAccount = (paymentAccountData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/paymentaccount/create-paymentAccount`, paymentAccountData)
    .then((res) => {
      dispatch({
        type: ADD_PAYMENTACCOUNT,
        payload: res.data.paymentAccount,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_PAYMENTACCOUNT,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deletePaymentAccount = (paymentAccountId) => (dispatch) => {
  axios
    .delete(`/paymentaccount/delete-paymentAccount/${paymentAccountId}`)
    .then((res) => {
      dispatch({
        type: DELETE_PAYMENTACCOUNT,
        payload: paymentAccountId,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editPayAccount = (payAccountData, payAccountId) => (dispatch) => {
  axios
    .put(`/paymentaccount/edit-payAccount/${payAccountId}`, payAccountData)
    .then((res) => {
      dispatch({
        type: EDIT_PAYACCOUNT,
        payload: res.data.payAccount,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_PAYMENTACCOUNT,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const editPaymentAccount =
  (paymentAccountData, paymentAccountId) => (dispatch) => {
    axios
      .put(
        `/paymentaccount/edit-paymentAccount/${paymentAccountId}`,
        paymentAccountData
      )
      .then((res) => {
        dispatch({
          type: EDIT_PAYMENTACCOUNT,
          payload: res.data.paymentAccount,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response) {
          dispatch({
            type: SET_ERROR_PAYMENTACCOUNT,
            payload: err.response.data,
          });
        } else {
          dispatch({
            type: SERVER_ERROR,
          });
        }
      });
  };

export const addTrip = (tripData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/trip/create-trip`, tripData)
    .then((res) => {
      dispatch({
        type: ADD_TRIP,
        payload: res.data.trip,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_TRIP,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteTrip = (tripId) => (dispatch) => {
  axios
    .delete(`/trip/delete-trip/${tripId}`)
    .then((res) => {
      dispatch({
        type: DELETE_TRIP,
        payload: tripId,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editTrip = (tripData, tripId) => (dispatch) => {
  axios
    .put(`/trip/edit-trip/${tripId}`, tripData)
    .then((res) => {
      dispatch({
        type: EDIT_TRIP,
        payload: res.data.trip,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_TRIP,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addBooking = (bookingData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios
    .post(`/booking/create-booking`, bookingData)
    .then(async (res) => {
      dispatch({
        type: ADD_USER_BOOKING,
        payload: res.data.booking,
      });
      await dispatch(fetchBookings());
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_USER_BOOKING,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteBooking = (bookId) => (dispatch) => {
  axios
    .delete(`/booking/delete-booking/${bookId}`)
    .then(async (res) => {
      dispatch({
        type: DELETE_USER_BOOKING,
        payload: bookId,
      });
      await dispatch(fetchBookings());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editBooking = (bookingData, bookId) => (dispatch) => {
  axios
    .put(`/booking/edit-booking/${bookId}`, bookingData)
    .then(async (res) => {
      dispatch({
        type: EDIT_USER_BOOKING,
        payload: res.data.booking,
      });
      await dispatch(fetchBookings());
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_USER_BOOKING,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addVehicle = (vehicleData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios
    .post(`/vehicle/create-vehicle`, vehicleData)
    .then(async (res) => {
      dispatch({
        type: ADD_VEHICLE,
        payload: res.data.vehicle,
      });
      await dispatch(fetchVehicles());

      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_VEHICLE,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteVehicle = (vehicleId) => async (dispatch) => {
  await axios
    .delete(`/vehicle/delete-vehicle/${vehicleId}`)
    .then(async (res) => {
      dispatch({
        type: DELETE_VEHICLE,
        payload: vehicleId,
      });
      await dispatch(fetchVehicles());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editVehicle = (vehicleData, vehicleId) => async (dispatch) => {
  await axios
    .put(`/vehicle/edit-vehicle/${vehicleId}`, vehicleData)
    .then(async (res) => {
      dispatch({
        type: EDIT_VEHICLE,
        payload: res.data.vehicle,
      });
      await dispatch(fetchVehicles());
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_VEHICLE,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addEmployee = (employeeData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios
    .post(`/auth/signup-employee`, employeeData)
    .then(async (res) => {
      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data.employee,
      });
      await dispatch(fetchEmployees());

      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_EMPLOYEE,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  await axios
    .delete(`/employee/delete-employee/${employeeId}`)
    .then(async (res) => {
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: employeeId,
      });
      await dispatch(fetchEmployees());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editEmployee = (employeeData, employeeId) => async (dispatch) => {
  await axios
    .put(`/employee/edit-employee/${employeeId}`, employeeData)
    .then(async (res) => {
      dispatch({
        type: EDIT_EMPLOYEE,
        payload: res.data.employee,
      });
      await dispatch(fetchEmployee(employeeId));
      await dispatch(fetchEmployees());
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_EMPLOYEE,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteCompany = (companyId) => async (dispatch) => {
  await axios
    .delete(`/company/delete-company/${companyId}`)
    .then(async (res) => {
      dispatch({
        type: DELETE_COMPANY,
        payload: companyId,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editCompany = (companyData, companyId) => async (dispatch) => {
  await axios
    .put(`/company/edit-company/${companyId}`, companyData)
    .then(async (res) => {
      dispatch({
        type: EDIT_COMPANY,
        payload: res.data.company,
      });
      await dispatch(fetchCompany(companyId));
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_COMPANY,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addLocation = (locationData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  await axios
    .post(`/location/create-location`, locationData)
    .then(async (res) => {
      dispatch({
        type: ADD_LOCATION,
        payload: res.data.location,
      });
      await dispatch(fetchLocations());

      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_LOCATION,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const deleteLocation = (locationId) => async (dispatch) => {
  await axios
    .delete(`/location/delete-location/${locationId}`)
    .then(async (res) => {
      dispatch({
        type: DELETE_LOCATION,
        payload: locationId,
      });
      await dispatch(fetchLocations());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const editLocation = (locationData, locationId) => async (dispatch) => {
  await axios
    .put(`/location/edit-location/${locationId}`, locationData)
    .then(async (res) => {
      dispatch({
        type: EDIT_LOCATION,
        payload: res.data.location,
      });
      await dispatch(fetchLocations());
    })
    .catch((err) => {
      console.log(err.response.data);
      if (err.response) {
        dispatch({
          type: SET_ERROR_LOCATION,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const addToCart = (tripData) => (dispatch) => {
  // const tripData = {
  //   tripId,
  //   quantity
  // }
  axios
    .post("/cart", tripData)
    .then((res) => {
      dispatch({
        type: ADD_CART_SUCCESS,
        payload: tripData,
      });
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: ADD_CART_FAIL,
      });
    });
};

export const getCart = () => (dispatch) => {
  axios
    .get("/cart")
    .then((res) => {
      dispatch({
        type: SET_CART,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: SET_CART,
        payload: [],
      });
    });
};

export const deleteCartTrip = (tripData) => (dispatch) => {
  axios
    .post("/delete-cart-trip", tripData)
    .then((res) => {
      dispatch({
        type: DELETE_TRIP_CART,
      });
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const removeCartTrip = (tripID) => (dispatch) => {
  axios
    .post(`/remove-cart-trip/${tripID}`)
    .then((res) => {
      // console.log(res.data);
      dispatch(getCart());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const fetchAddress = (userData, history) => (dispatch) => {
  const location = `+${userData.aptName},+${userData.locality},+${userData.street},+${userData.zip}`;
  axiosNewInstance
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: process.env.REACT_APP_GOOGLE_API_KEY,
      },
    })
    .then((result) => {
      const formattedAddress = result.data.results[0].formatted_address;
      // console.log(formattedAddress);
      const lat = result.data.results[0].geometry.location.lat;
      const lng = result.data.results[0].geometry.location.lng;
      userData.lat = lat;
      userData.lng = lng;
      userData.formattedAddress = formattedAddress;
      dispatch(addAddress(userData, history));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addAddress = (userData, history) => (dispatch) => {
  // console.log(userData.formattedAddress);
  axios
    .post("/user/address", userData)
    .then((res) => {
      // console.log(res.data);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      dispatch(placeBooking(history));
    })
    .catch((err) => {
      console.log(err.response);
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const placeBooking = (history, bookingData) => (dispatch) => {
  axios
    .post("/booking", bookingData)
    .then((res) => {
      dispatch({
        type: ADD_BOOKING_SUCCESS,
        payload: bookingData,
      });
      history.push("/bookings");
      dispatch(getBookings());
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getBookings = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/bookings")
    .then((res) => {
      dispatch({
        type: SET_BOOKINGS,
        payload: res.data.bookings,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const getBooking = (history, bookingId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/booking/${bookingId}`)
    .then((res) => {
      dispatch({
        type: SET_BOOKING,
        payload: res.data.booking,
      });
      localStorage.setItem("bookingDetail", JSON.stringify(res.data.booking));
      history.push(`/booking/${bookingId}`);
    })

    .catch((err) => {
      console.log(err.response);
    });
};

export const changeTicketsCount = (tripId, body) => (dispatch) => {
  axios
    .put(`/edit-ticketsCount/${tripId}`, body)
    .then((res) => {
      dispatch({
        type: UPDATE_TICKETSCOUNT_SUCCESS,
        payload: body,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const changeBookingStatus = (bookingId, body) => (dispatch) => {
  axios
    .post(`/booking-status/${bookingId}`, body)
    .then((res) => {
      dispatch({
        type: EDIT_STATUS,
        payload: res.data.updatedbooking,
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export const socketStatusUpdate = (booking) => (dispatch) => {
  dispatch({
    type: EDIT_STATUS,
    payload: booking,
  });
};
