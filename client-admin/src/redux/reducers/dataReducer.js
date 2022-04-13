import {
  SET_CLIENTS,
  LOADING_DATA,
  SET_CLIENT,
  SET_AVAILABLE_TRIPS,
  SET_AVAILABLE_TRIP,
  SET_TRIPS,
  SET_TRIP,
  ADD_CART_FAIL,
  ADD_CART_SUCCESS,
  ADD_BOOKING_SUCCESS,
  UPDATE_TICKETSCOUNT_SUCCESS,
  SET_CART,
  DELETE_TRIP_CART,
  SET_BOOKINGS,
  SET_BOOKING,
  SET_VEHICLES,
  SET_VEHICLE,
  SET_LOCATIONS,
  SET_LOCATION,
  EDIT_STATUS,
  SET_USER_BOOKING,
  SET_USER_BOOKINGS,
  SET_EMPLOYEES,
  SET_EMPLOYEE,
  SET_COMPANY,
  SET_COMPANY_BRANCHES,
  SET_COMPANY_BRANCH,
  SET_PAYMENTACCOUNTS,
  SET_PAYMENTACCOUNT,
  SET_COMPANIES,
  SET_SUPER_CLIENTS,
  SET_REFUNDS,
  SET_REFUND,
  SET_SCH_TRIPS,
  SET_COMPLAINTS,
  SET_COMPLAINT,
} from "../types";

const initialState = {
  clients: [],
  superClients: [],
  client: {},
  branches: [],
  branch: {},
  paymentAccounts: [],
  paymentAccount: {},
  availableTrip: [],
  availableTripDetail: {},
  cart: [],
  price: "",
  loading: true,
  addCartSuccess: null,
  deleteSuccessTrip: null,
  bookings: [],
  booking: {},
  userBookings: [],
  userBooking: {},
  vehicles: [],
  vehicle: {},
  employees: [],
  employee: {},
  companies: [],
  company: {},
  locations: [],
  location: {},
  complaints: [],
  complaint: {},
  refunds: [],
  refund: {},
  shtrips: [],
  trips: [],
  trip: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SUPER_CLIENTS:
      return {
        ...state,
        superClients: action.payload,
        loading: false,
      };
    case SET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false,
      };
    case SET_CLIENT:
      return {
        ...state,
        client: action.payload.result,
        loading: false,
      };
    case SET_AVAILABLE_TRIPS:
      return {
        ...state,
        availableTrip: action.payload.result,
        loading: false,
      };
    case SET_AVAILABLE_TRIP:
      return {
        ...state,
        availableTripDetail: action.payload.result,
        loading: false,
      };
    case ADD_CART_SUCCESS:
      return {
        ...state,
        addCartSuccess: true,
      };
    case ADD_BOOKING_SUCCESS:
      return {
        ...state,
        addBookingSuccess: true,
      };
    case UPDATE_TICKETSCOUNT_SUCCESS:
      return {
        ...state,
        updateTicketsCountSuccess: true,
      };
    case ADD_CART_FAIL:
      return {
        ...state,
        addCartSuccess: false,
      };
    case DELETE_TRIP_CART:
      return {
        ...state,
        deleteSuccessTrip: true,
      };
    case SET_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      };
    case SET_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false,
      };
    case SET_USER_BOOKINGS:
      return {
        ...state,
        bookings: action.payload,
        loading: false,
      };
    case SET_USER_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false,
      };
    case SET_COMPANY_BRANCHES:
      return {
        ...state,
        branches: action.payload,
        loading: false,
      };
    case SET_COMPANY_BRANCH:
      return {
        ...state,
        branch: action.payload,
        loading: false,
      };
    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
        loading: false,
      };
    case SET_VEHICLE:
      return {
        ...state,
        vehicle: action.payload,
        loading: false,
      };
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
        loading: false,
      };
    case SET_EMPLOYEE:
      return {
        ...state,
        employee: action.payload,
        loading: false,
      };
    case SET_PAYMENTACCOUNTS:
      return {
        ...state,
        paymentAccounts: action.payload,
        loading: false,
      };
    case SET_PAYMENTACCOUNT:
      return {
        ...state,
        paymentAccount: action.payload,
        loading: false,
      };
    case SET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false,
      };
    case SET_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false,
      };
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
        loading: false,
      };

    case SET_COMPLAINTS:
      return {
        ...state,
        complaints: action.payload,
        loading: false,
      };
    case SET_COMPLAINT:
      return {
        ...state,
        complaint: action.payload,
        loading: false,
      };

    case SET_REFUNDS:
      return {
        ...state,
        refunds: action.payload,
        loading: false,
      };
    case SET_REFUND:
      return {
        ...state,
        refund: action.payload,
        loading: false,
      };
    case SET_SCH_TRIPS:
      return {
        ...state,
        shtrips: action.payload,
        loading: false,
      };
    case SET_TRIPS:
      return {
        ...state,
        trips: action.payload,
        loading: false,
      };

    case SET_TRIP:
      return {
        ...state,
        trip: action.payload,
        loading: false,
      };
    case EDIT_STATUS:
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking._id === action.payload._id ? { ...action.payload } : booking
        ),
      };
    case SET_CART:
      return {
        ...state,
        cart: action.payload.cart,
        price: action.payload.totalPrice,
        loading: false,
      };
    default:
      return state;
  }
}
