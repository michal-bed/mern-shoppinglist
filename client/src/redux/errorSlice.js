import { createSlice } from '@reduxjs/toolkit'
import { ACT_GET_ERRORS, ACT_CLEAR_ERRORS } from './types'

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    msg: {},
    status: null,
    id: null
  },
  reducers: {
    [ACT_GET_ERRORS]: (state, action) => {
        state.msg = action.payload.msg;
        state.status = action.payload.status;
        state.id = action.payload.id;
    },
    [ACT_CLEAR_ERRORS]: (state) =>{
        state.msg = {};
        state.status = null;
        state.id = null;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
    GET_ERRORS,
    CLEAR_ERRORS
  } = errorSlice.actions;

export default errorSlice.reducer;