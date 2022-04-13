import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SERVER_ERROR,
  SIGNUP_SUCCESS,
  SET_ERROR,
  SET_ERRORS_SIGNUP_COMPANY,
  SET_ERROR_TRIP,
} from "../types";

const initialState = {
  loading: false,
  serverError: false,
  errors: null,
  errorsCompany: null,
  signUpSuccess: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        serverError: false,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload.message,
        serverError: false,
      };
    case SET_ERROR_TRIP:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        serverError: false,
      };
    case SET_ERRORS_SIGNUP_COMPANY:
      return {
        ...state,
        loading: false,
        errorsCompany: action.payload,
        serverError: false,
      };
    case SERVER_ERROR:
      return {
        ...state,
        loading: false,
        serverError: true,
        errors: null,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
        errorsCompany: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
        serverError: false,
        signUpSuccess: false,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: true,
      };
    default:
      return state;
  }
}
