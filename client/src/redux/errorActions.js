import { GET_ERRORS, CLEAR_ERRORS } from './errorSlice';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => (dispatch) => {
    dispatch(GET_ERRORS({ msg, status, id }));
};
  
// CLEAR ERRORS
export const clearErrors = () => (dispatch) => {
    dispatch(CLEAR_ERRORS());
};