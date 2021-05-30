import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { v4 as uuid } from "uuid";
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { ACT_ITEMS_LOADING } from './types';
//import store from './store';

export const getItems = createAsyncThunk(
  'list/getItemsStatus',
  async (arg, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get('api/items');
      return response.data; 
    }
    catch(err)
    {
      dispatch(returnErrors(err.response.data, err.response.status));
      return rejectWithValue({dispatch, errMsg: err.response.data, status: err.response.status});
      // return rejectWithValue({errMsg: err.reponse.data});
    }
  }
)

export const addItem = createAsyncThunk(
  'list/addItemStatus',
    async (item, {rejectWithValue, dispatch, getState}) => {
      try {
        const response = await axios.post('api/items', item, tokenConfig(getState));//then((response) => response.data);
        return response.data;
      }
      catch(err)
      {
        // return rejectWithValue(err.response.data);
        // const tab = [dispatch, err.reponse.data, err.reponse.status];
        // const obj = { dispatch, errMsg: err.reponse.data, status: err.response.status};
        //return rejectWithValue(err.reponse.status);
        // console.log("----------------->>>>", obj);
        dispatch(returnErrors(err.response.data, err.response.status));
        return rejectWithValue({errMsg: err.response.data})
        // return rejectWithValue({dispatch, errMsg: err.response.data, status: err.response.status});
      }
    }
  )

  export const deleteItem = createAsyncThunk(
    'list/deleteItemStatus',
  async (id, {rejectWithValue, dispatch, getState}) => {
    try {  
      const response = await axios.delete(`api/items/${id}`, tokenConfig(getState));//.then(() => id);
      return response.data;
    }
    catch(err)
    {
      dispatch(returnErrors(err.response.data, err.response.status));
      // return rejectWithValue({dispatch, errMsg: err.response.data, status: err.response.status});
      return rejectWithValue({errMsg: err.response.data});
    }
  }
)

export const listSlice = createSlice({
  name: 'list',
  initialState: {
    items: [],
    loading: false,
    error: ''
    // { id: uuid(), name: "Eggs" },
    // { id: uuid(), name: "Milk" },
    // { id: uuid(), name: "Steak" },
    // { id: uuid(), name: "Water" }
  },
  reducers: {
    [ACT_ITEMS_LOADING]: (state) => {
      state.loading = true;
      state.error = '';
    }
    // getItems: (state) => {
    //   // don't mutate the state
    // },
    // addItem: (state, action) => {
    //   // state = ({ items: [...state.items, action.payload] });
    //   state.items = [action.payload,...state.items];
    // },
    // deleteItem: (state, action) => {
    //   // state = { items: state.items.filter(item => item.id !== action.payload) };
    //   state.items = state.items.filter(item => item._id !== action.payload);
    // },
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getItems.pending]: (state, action) => {
      // Add user to the state array
      state.loading = true;
      state.error = '';
    },
    [getItems.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.items = action.payload;
    },
    [getItems.rejected]: (state, action) => {
      // const {thunkAPI, errMsg, status } = action.payload;
      const { errMsg } = action.payload;
      // Add user to the state array
      state.loading = false;
      // state.items = [];
      // state.error = action.error.message;
      state.error = errMsg;
      // thunkAPI.dispatch(returnErrors(errMsg, status));
    },
    
    [addItem.pending]: (state) => {
      // Add user to the state array
      state.loading = true;
      state.error = '';
    },
    [addItem.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.items = [action.payload, ...state.items];
    },
    [addItem.rejected]: (state, action) => {
      console.log('action.payload:', action.payload);
      // const { errMsg, status, dispatch } = action.payload;
      const { errMsg } = action.payload;
      // Add user to the state array
      state.loading = false;
      // state.items = [];
      state.error = errMsg;
      //dispatch(returnErrors(errMsg, status));
    },

    [deleteItem.pending]: (state) => {
      // Add user to the state array
      state.loading = true;
      state.error = '';
    },
    [deleteItem.fulfilled]: (state, action) => {
      // Add user to the state array
      state.loading = false;
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    [deleteItem.rejected]: (state, action) => {
      console.log('action.payload:', action.payload);
      // const {thunkAPI, errMsg, status } = action.payload;
      const { errMsg } = action.payload;
      // Add user to the state array
      state.loading = false;
      // state.items = [];
      state.error = errMsg;
      //thunkAPI.dispatch(returnErrors(errMsg, status));
    },
  }
});

// Action creators are generated for each case reducer function
// export const {
              //getItems,
              //addItem, 
              //deleteItem } = listSlice.actions

export default listSlice.reducer;