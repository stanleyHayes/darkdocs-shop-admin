import {
    CREATE_LOGIN_FAILURE,
    CREATE_LOGIN_REQUEST,
    CREATE_LOGIN_SUCCESS, DELETE_LOGIN_FAILURE, DELETE_LOGIN_REQUEST, DELETE_LOGIN_SUCCESS,
    GET_LOGINS_FAILURE,
    GET_LOGINS_REQUEST,
    GET_LOGINS_SUCCESS, UPDATE_LOGIN_FAILURE, UPDATE_LOGIN_REQUEST, UPDATE_LOGIN_SUCCESS
} from "./logins-action-types";

const INITIAL_STATE = {
    logins: [],
    loading: false,
    error: null,
    singleLogin: {},
    loginsCount:0
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
                logins: [...state.logins, action.payload],
                loginsCount: state.loginsCount + 1
            }

        case CREATE_LOGIN_FAILURE:
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
                logins: action.payload.logins,
                loginsCount: action.payload.loginsCount
            }

        case GET_LOGINS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                logins: [],
                loginsCount: 0
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
                error: action.payload
            }

        case DELETE_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case DELETE_LOGIN_SUCCESS:
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

        case DELETE_LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default loginsReducer;
