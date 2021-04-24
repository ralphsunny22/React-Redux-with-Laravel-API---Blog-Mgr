import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, USER_LOADED, LOGOUT_SUCCESS } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions'

export const register = (user) => dispatch => {

    const config = {
        headers: {
            "Content-type":"application/json"
        }
    }

    axios.post('http://127.0.0.1:8000/register/', user, config).then(res=>
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({
        type: REGISTER_FAIL
    });
    });
}

//login
export const login = (user) => dispatch => {

    const config = {
        headers: {
            "Content-type":"application/json"
        }
    }

    axios.post('http://127.0.0.1:8000/login/', user, config).then(res=>
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })
    )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
    dispatch({
        type: LOGIN_FAIL
    });
    });
}

//loadUser
export const loadUser = () => {
  return (dispatch, getState) => {
    axios.get('http://127.0.0.1:8000/user', tokenConfig(getState)).then(res => 
    dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
      type: AUTH_ERROR
  });
  });

  }
}

//logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

  //Setup config/headers and token
  export const tokenConfig = (getState) => {

    //get token from localStorage
    const token = getState().auth.token

    //Headers
    const config = {
      headers:{
        "Content-type" : "application/json"
      }
    }

    if(token){
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config;
  }



