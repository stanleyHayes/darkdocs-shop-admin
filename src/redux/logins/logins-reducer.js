import {
    CREATE_LOGIN_REQUEST,
    CREATE_LOGIN_SUCCESS,
    GET_LOGINS_FAILURE,
    GET_LOGINS_REQUEST,
    GET_LOGINS_SUCCESS, UPDATE_LOGIN_FAILURE, UPDATE_LOGIN_REQUEST, UPDATE_LOGIN_SUCCESS
} from "./logins-action-types";
import {CREATE_USER_FAILURE} from "../users/user-action-types";

const INITIAL_STATE = {
    logins: [],
    loading: false,
    error: null,
    singleLogin: {}
};

const loginsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case CREATE_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                logins: [...state.logins, action.payload]
            }

        case CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_LOGINS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_LOGINS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                logins: action.payload
            }

        case GET_LOGINS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                logins: []
            }

        case UPDATE_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                logins: [...state.logins.map(login => {
                    if(login._id === action.payload._id){
                        return {...action.payload};
                    }
                    return login;
                })]
            }

        case UPDATE_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                logins: []
            }

        default:
            return state;
    }
}

export default loginsReducer;
