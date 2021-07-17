import axios from "axios";
import {DEVELOPMENT_SERVER} from "../../constants/constants";
import {
    CREATE_USER_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    GET_USER_FAILURE, GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USERS_FAILURE,
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    UPDATE_USER_FAILURE,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from "./user-action-types";

const createUserRequest = () => {
    return {
        type: CREATE_USER_REQUEST
    }
}

const createUserSuccess = user => {
    return {
        type: CREATE_USER_SUCCESS,
        payload: user
    }
}

const createUserFailure = error => {
    return {
        type: CREATE_USER_FAILURE,
        payload: error
    }
}

export const createUser = (user, token) => {
    return dispatch => {
        dispatch(createUserRequest());
        axios({
            method: 'post',
            url: `${DEVELOPMENT_SERVER}/users`,
            headers: {Authorization: `Bearer ${token}`},
            data: user
        }).then(res => {
            const {data} = res.data;
            dispatch(createUserSuccess(data));
        }).catch(error => {
            dispatch(createUserFailure(error.response.data.message));
        });
    }
}


const getUserRequest = () => {
    return {
        type: GET_USER_REQUEST
    }
}

const getUserSuccess = user => {
    return {
        type: GET_USER_SUCCESS,
        payload: user
    }
}

const getUserFailure = error => {
    return {
        type: GET_USER_FAILURE,
        payload: error
    }
}

export const getUser = (id, token) => {
    return dispatch => {
        dispatch(getUserRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_SERVER}/users/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getUserSuccess(data));
        }).catch(error => {
            dispatch(getUserFailure(error.response.data.message));
        });
    }
}


const updateUserRequest = () => {
    return {
        type: UPDATE_USER_REQUEST
    }
}

const updateUserSuccess = instruction => {
    return {
        type: UPDATE_USER_SUCCESS,
        payload: instruction
    }
}

const updateUserFailure = error => {
    return {
        type: UPDATE_USER_FAILURE,
        payload: error
    }
}

export const updateUser = (id, user, token) => {
    return dispatch => {
        dispatch(updateUserRequest());
        axios({
            method: 'put',
            url: `${DEVELOPMENT_SERVER}/users/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: user
        }).then(res => {
            const {data} = res.data;
            dispatch(updateUserSuccess(data));
        }).catch(error => {
            dispatch(updateUserFailure(error.response.data.message));
        });
    }
}


const deleteUserRequest = () => {
    return {
        type: DELETE_USER_REQUEST
    }
}

const deleteInstructionSuccess = user => {
    return {
        type: DELETE_USER_SUCCESS,
        payload: user
    }
}

const deleteUserFailure = error => {
    return {
        type: DELETE_USER_FAILURE,
        payload: error
    }
}

export const deleteUser = (id, token) => {
    return dispatch => {
        dispatch(deleteUserRequest());
        axios({
            method: 'delete',
            url: `${DEVELOPMENT_SERVER}/users/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(deleteInstructionSuccess(data));
        }).catch(error => {
            dispatch(deleteUserFailure(error.response.data.message));
        });
    }
}


const getUsersRequest = () => {
    return {
        type: GET_USERS_REQUEST
    }
}

const getUsersSuccess = users => {
    return {
        type: GET_USERS_SUCCESS,
        payload: users
    }
}

const getUsersFailure = error => {
    return {
        type: GET_USERS_FAILURE,
        payload: error
    }
}

export const getUsers = (token) => {
    return dispatch => {
        dispatch(getUsersRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_SERVER}/users`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getUsersSuccess(data));
        }).catch(error => {
            dispatch(getUsersFailure(error.response.data.message));
        });
    }
}
