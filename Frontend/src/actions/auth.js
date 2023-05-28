import axios from 'axios';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, AUTH_ERROR } from './types';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('/api/auth/register', { email, password });

    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: error.response.data,
    });
  }
};
