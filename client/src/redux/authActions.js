  import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './authSlice';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch(USER_LOADING());
  
    axios
      .get('api/auth/user', tokenConfig(getState))
      .then(res =>
        dispatch(USER_LOADED(res.data))
      )
      .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch(AUTH_ERROR());
      });
  };
  
  // Register User
  export const register = ({ name, email, password }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ name, email, password });
  
    axios
      .post('api/auth/register', body, config)
      .then(res =>
        dispatch(REGISTER_SUCCESS(res.data))
      )
      .catch(err => {
        dispatch(
            returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
        );
        dispatch(REGISTER_FAIL());
      });
  };
  
  // Login User
  export const login = ({ email, password }) => (dispatch) => {
    // Headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    // Request body
    const body = JSON.stringify({ email, password });
  
    axios
      .post('api/auth/login', body, config)
      .then(res =>
        dispatch(LOGIN_SUCCESS(res.data))
      )
      .catch(err => {
        dispatch(
          returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
        );
        dispatch(LOGIN_FAIL());
      });
  };
  
  // Logout User
  export const logout = () => (dispatch) => {
    dispatch(LOGOUT_SUCCESS());
  };
  
  // Setup config/headers and token
  export const tokenConfig = (getState) => {
    // Get token from localstorage
    const token = getState().auth.token;
  
    // Headers
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };
  
    // If token, add to headers
    if (token) {
      config.headers['x-auth-token'] = token;
    }
  
    return config;
  };