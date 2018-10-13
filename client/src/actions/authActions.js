import axios from 'axios'
import jwt_decode from 'jwt-decode'

import setAuthToken from '../utils/setAuthToken'

import { SET_ERRORS, SET_CURRENT_USER } from '../constants/actionTypes'
import { SERVER_URL } from '../constants/keys'

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post(`${SERVER_URL}/users/register`, userData)
    .then(() => history.push('/login'))
    .catch(err =>
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    )
}

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post(`${SERVER_URL}/users/login`, userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      // Set token to auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

// Set current user - Used when user comes back with a token stored in localStorage
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from lcocalStorage
  localStorage.removeItem('jwtToken')
  // Remove auth header
  setAuthToken(false)
  // Set current user to empty object
  dispatch(setCurrentUser({}))
}
