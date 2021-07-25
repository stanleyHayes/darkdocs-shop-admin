import {
    CREATE_USER_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "./user-action-types";

const INITIAL_STATE = {
    users: [],
    loading: false,
    error: null,
    singleUser: {}
};

const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ""
            }

        case GET_USERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users, action.payload],
                error: ""
            }

        case CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case UPDATE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: [...state.users.map(user => {
                    if (user._id === action.payload._id) {
                        return {...action.payload}
                    }
                    return user;
                })],
                error: ""
            }

        case UPDATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default usersReducer;
