import axios from "axios";
import {SERVER_BASE_URL} from "../../constants/constants";
import {
    CREATE_DUMP_FAILURE,
    CREATE_DUMP_REQUEST,
    CREATE_DUMP_SUCCESS,
    DELETE_DUMP_FAILURE,
    DELETE_DUMP_REQUEST,
    DELETE_DUMP_SUCCESS,
    GET_DUMP_FAILURE,
    GET_DUMP_REQUEST,
    GET_DUMP_SUCCESS,
    GET_DUMPS_FAILURE,
    GET_DUMPS_REQUEST,
    GET_DUMPS_SUCCESS,
    UPDATE_DUMP_FAILURE,
    UPDATE_DUMP_REQUEST,
    UPDATE_DUMP_SUCCESS
} from "./dumps-action-types";

const createDumpRequest = () => {
    return {
        type: CREATE_DUMP_REQUEST
    }
}

const createDumpSuccess = dump => {
    return {
        type: CREATE_DUMP_SUCCESS,
        payload: dump
    }
}

const createDumpFailure = error => {
    return {
        type: CREATE_DUMP_FAILURE,
        payload: error
    }
}

export const createDump = (dump, token, showNotification) => {
    return dispatch => {
        dispatch(createDumpRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL}/dumps`,
            headers: {Authorization: `Bearer ${token}`},
            data: dump
        }).then(res => {
            const {data, message} = res.data;
            showNotification(message, {variant: 'success'});
            dispatch(createDumpSuccess(data));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(createDumpFailure(error.response.data.message));
        });
    }
}


const getDumpRequest = () => {
    return {
        type: GET_DUMP_REQUEST
    }
}

const getDumpSuccess = dump => {
    return {
        type: GET_DUMP_SUCCESS,
        payload: dump
    }
}

const getDumpFailure = error => {
    return {
        type: GET_DUMP_FAILURE,
        payload: error
    }
}

export const getDump = (id, token) => {
    return dispatch => {
        dispatch(getDumpRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/dumps/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getDumpSuccess(data));
        }).catch(error => {
            dispatch(getDumpFailure(error.response.data.message));
        });
    }
}


const updateDumpRequest = () => {
    return {
        type: UPDATE_DUMP_REQUEST
    }
}

const updateDumpSuccess = fund => {
    return {
        type: UPDATE_DUMP_SUCCESS,
        payload: fund
    }
}

const updateDumpFailure = error => {
    return {
        type: UPDATE_DUMP_FAILURE,
        payload: error
    }
}

export const updateDump = (id, dump, token, showNotification) => {
    return dispatch => {
        dispatch(updateDumpRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL}/dumps/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: dump
        }).then(res => {
            const {data, message} = res.data;
            showNotification(message, {variant: 'success'});
            dispatch(updateDumpSuccess(data));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(updateDumpFailure(error.response.data.message));
        });
    }
}


const deleteDumpRequest = () => {
    return {
        type: DELETE_DUMP_REQUEST
    }
}

const deleteDumpSuccess = dump => {
    return {
        type: DELETE_DUMP_SUCCESS,
        payload: dump
    }
}

const deleteDumpFailure = error => {
    return {
        type: DELETE_DUMP_FAILURE,
        payload: error
    }
}

export const deleteDump = (id, token, showNotification) => {
    return dispatch => {
        dispatch(deleteDumpRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL}/dumps/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message} = res.data;
            showNotification(message, {variant: 'success'});
            dispatch(deleteDumpSuccess(data));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(deleteDumpFailure(error.response.data.message));
        });
    }
}


const getDumpsRequest = () => {
    return {
        type: GET_DUMPS_REQUEST
    }
}

const getDumpsSuccess = (dumps, ccDumpsCount) => {
    return {
        type: GET_DUMPS_SUCCESS,
        payload: {dumps, ccDumpsCount}
    }
}

const getDumpsFailure = error => {
    return {
        type: GET_DUMPS_FAILURE,
        payload: error
    }
}

export const getDumps = (token, query, showNotification) => {
    return dispatch => {
        dispatch(getDumpsRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/dumps?${query}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message, ccDumpsCount} = res.data;
            showNotification(message, {variant: 'success'});
            dispatch(getDumpsSuccess(data, ccDumpsCount));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(getDumpsFailure(error.response.data.message));
        });
    }
}
