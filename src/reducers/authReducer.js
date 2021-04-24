import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_FAIL, LOGIN_SUCCESS, AUTH_ERROR, USER_LOADED, LOGOUT_SUCCESS } from '../actions/types';

import jwtDecode from 'jwt-decode';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null,
    userSuccessMsg: '',
    user_id: ''
};

export default function postReducer(state = initialState, action){

    switch (action.type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.access_token)
             
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                userSuccessMsg: action.payload.message
                 
            }

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR: //
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: true,
                user: null,
                userSuccessMsg: '',
                user_id: ''
            }


        case USER_LOADED:
            //check passport-jwt token
            const jwtToken = jwtDecode(action.payload.access_token)
            // console.log(testToken)
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                token: action.payload.access_token,
                user: action.payload.user,
                user_id: jwtToken.sub
            };

        
    
        default:
            return state;
    }

}