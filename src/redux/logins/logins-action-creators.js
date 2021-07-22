import axios from "axios";
import {DEVELOPMENT_SERVER} from "../../constants/constants";
import {
    CREATE_LOGIN_FAILURE,
    CREATE_LOGIN_REQUEST,
    CREATE_LOGIN_SUCCESS,
    DELETE_LOGIN_FAILURE,
    DELETE_LOGIN_REQUEST,
    DELETE_LOGIN_SUCCESS,
    GET_LOGIN_FAILURE,
    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGINS_FAILURE,
    GET_LOGINS_REQUEST,
    GET_LOGINS_SUCCESS,
    UPDATE_LOGIN_FAILURE,
    UPDATE_LOGIN_REQUEST,
    UPDATE_LOGIN_SUCCESS
} from "./logins-action-types";

const createLoginRequest = () => {
    return {
        type: CREATE_LOGIN_REQUEST
    }
}

const createLoginSuccess = login => {
    return {
        type: CREATE_LOGIN_SUCCESS,
        payload: login
    }
}

const createLoginFailure = error => {
    return {
        type: CREATE_LOGIN_FAILURE,
        payload: error
    }
}

export const createLogin = (login, token) => {
    return dispatch => {
        dispatch(createLoginRequest());
        axios({
            method: 'post',
            url: `${DEVELOPMENT_SERVER}/logins`,
            headers: {Authorization: `Bearer ${token}`},
            data: login
        }).then(res => {
            const {data} = res.data;
            dispatch(createLoginSuccess(data));
        }).catch(error => {
            dispatch(createLoginFailure(error.response.data.message));
        });
    }
}


const getLoginRequest = () => {
    return {
        type: GET_LOGIN_REQUEST
    }
}

const getLoginSuccess = login => {
    return {
        type: GET_LOGIN_SUCCESS,
        payload: login
    }
}

const getLoginFailure = error => {
    return {
        type: GET_LOGIN_FAILURE,
        payload: error
    }
}

export const getLogin = (id, token) => {
    return dispatch => {
        dispatch(getLoginRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_SERVER}/logins/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getLoginSuccess(data));
        }).catch(error => {
            dispatch(getLoginFailure(error.response.data.message));
        });
    }
}


const updateLoginRequest = () => {
    return {
        type: UPDATE_LOGIN_REQUEST
    }
}

const updateLoginSuccess = fund => {
    return {
        type: UPDATE_LOGIN_SUCCESS,
        payload: fund
    }
}

const updateLoginFailure = error => {
    return {
        type: UPDATE_LOGIN_FAILURE,
        payload: error
    }
}

export const updateLogin = (id, login, token) => {
    return dispatch => {
        dispatch(updateLoginRequest());
        axios({
            method: 'put',
            url: `${DEVELOPMENT_SERVER}/logins/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: login
        }).then(res => {
            const {data} = res.data;
            dispatch(updateLoginSuccess(data));
        }).catch(error => {
            dispatch(updateLoginFailure(error.response.data.message));
        });
    }
}


const deleteLoginRequest = () => {
    return {
        type: DELETE_LOGIN_REQUEST
    }
}

const deleteLoginSuccess = fund => {
    return {
        type: DELETE_LOGIN_SUCCESS,
        payload: fund
    }
}

const deleteLoginFailure = error => {
    return {
        type: DELETE_LOGIN_FAILURE,
        payload: error
    }
}

export const deleteLogin = (id, token) => {
    return dispatch => {
        dispatch(deleteLoginRequest());
        axios({
            method: 'delete',
            url: `${DEVELOPMENT_SERVER}/logins/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(deleteLoginSuccess(data));
        }).catch(error => {
            dispatch(deleteLoginFailure(error.response.data.message));
        });
    }
}


const getLoginsRequest = () => {
    return {
        type: GET_LOGINS_REQUEST
    }
}

const getLoginsSuccess = funds => {
    return {
        type: GET_LOGINS_SUCCESS,
        payload: funds
    }
}

const getLoginsFailure = error => {
    return {
        type: GET_LOGINS_FAILURE,
        payload: error
    }
}

export const getLogins = (token) => {
    return dispatch => {
        dispatch(getLoginsRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_SERVER}/logins`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getLoginsSuccess(data));
        }).catch(error => {
            dispatch(getLoginsFailure(error.response.data.message));
        });
    }
}
