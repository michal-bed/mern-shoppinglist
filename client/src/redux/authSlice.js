import { createSlice, createAction } from '@reduxjs/toolkit'
import {
    ACT_USER_LOADED,
    ACT_USER_LOADING,
    ACT_AUTH_ERROR,
    ACT_LOGIN_SUCCESS,
    ACT_LOGIN_FAIL,
    ACT_LOGOUT_SUCCESS,
    ACT_REGISTER_SUCCESS,
    ACT_REGISTER_FAIL,
  } from './types';

  export const LOGIN_SUCCESS = createAction(ACT_LOGIN_SUCCESS);
  export const REGISTER_SUCCESS = createAction(ACT_REGISTER_SUCCESS);
  export const AUTH_ERROR = createAction(ACT_AUTH_ERROR);
  export const LOGIN_FAIL = createAction(ACT_LOGIN_FAIL);
  export const LOGOUT_SUCCESS = createAction(ACT_LOGOUT_SUCCESS);
  export const REGISTER_FAIL = createAction(ACT_REGISTER_FAIL);

// helper function to match any actions in a provided list
// actions can be `string` types or redux-toolkit action creators
const isAnyOf = (...matchers) => 
  (action) =>
    matchers.some((matcher) =>
      typeof matcher === "string"
        ? matcher === action.type
        : matcher.type === action.type
    );


export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
  },
  reducers: {
    [ACT_USER_LOADING]: (state) => {
        state.isLoading = true;
    },
    [ACT_USER_LOADED]: (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
    },
    // [ACT_LOGIN_SUCCESS
    //     // | ACT_REGISTER_SUCCESS
    // ]: (state, action) => {
    //   localStorage.setItem('token', action.payload.token); 
    //     for (const [key, value] of Object.entries(action.payload)) {
    //         state[key] = value;
    //     }
    //     state.isAuthenticated = true;
    //     state.isLoading = false;
    // },
    // [ACT_AUTH_ERROR
    //     // | ACT_LOGIN_FAIL | ACT_LOGOUT_SUCCESS | ACT_REGISTER_FAIL
    // ]: (state) => {
    //   localStorage.removeItem('token');
    //     state.token = null;
    //     state.user = null;
    //     state.isAuthenticated = false;
    //     state.isLoading = false;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(LOGIN_SUCCESS, REGISTER_SUCCESS),
        (state, action) => {
          localStorage.setItem(`token`, //-${action.payload.user.id}`, 
                                action.payload.token); 
            for (const [key, value] of Object.entries(action.payload)) {
                state[key] = value;
            }
            state.isAuthenticated = true;
            state.isLoading = false;
         },
      )
      .addMatcher(
        isAnyOf(AUTH_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL),
        (state) => {
          localStorage.removeItem(`token`); //`token-${state.user.id}`
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isLoading = false;
        }
      );
    }  
  }
);

// Action creators are generated for each case reducer function
export const {
    USER_LOADED,
    USER_LOADING,
    //LOGIN_SUCCESS,
    //AUTH_ERROR
  } = authSlice.actions

// export const REGISTER_SUCCESS = LOGIN_SUCCESS;
// REGISTER_SUCCESS.type = ACT_REGISTER_SUCCESS;
// export const LOGOUT_SUCCESS = AUTH_ERROR;
// export const REGISTER_FAIL = AUTH_ERROR
// export const LOGIN_FAIL = AUTH_ERROR;

export default authSlice.reducer