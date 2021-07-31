import {
    DELETE_CHEQUE_FAILURE,
    DELETE_CHEQUE_REQUEST,
    DELETE_CHEQUE_SUCCESS,
    GET_CHEQUE_FAILURE,
    GET_CHEQUE_REQUEST,
    GET_CHEQUE_SUCCESS,
    GET_CHEQUES_FAILURE,
    GET_CHEQUES_REQUEST,
    GET_CHEQUES_SUCCESS,
    REQUEST_CHEQUE_FAILURE,
    REQUEST_CHEQUE_REQUEST,
    REQUEST_CHEQUE_SUCCESS,
    UPDATE_CHEQUE_FAILURE,
    UPDATE_CHEQUE_REQUEST,
    UPDATE_CHEQUE_SUCCESS
} from "./cheques-action-types";
import axios from "axios";
import {SERVER_BASE_URL} from "../../constants/constants";

const requestChequeRequest = () => {
    return {
        type: REQUEST_CHEQUE_REQUEST
    }
}

const requestChequeSuccess = cheque => {
    return {
        type: REQUEST_CHEQUE_SUCCESS,
        payload: cheque
    }
}

const requestChequeFailure = error => {
    return {
        type: REQUEST_CHEQUE_FAILURE,
        payload: error
    }
}

export const requestCheque = (cheque, token) => {
    return dispatch => {
        dispatch(requestChequeRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL}/cheques`,
            headers: {Authorization: `Bearer ${token}`},
            data: cheque
        }).then(res => {
            const {data} = res.data;
            dispatch(requestChequeSuccess(data));
        }).catch(error => {
            dispatch(requestChequeFailure(error.response.data.message));
        });
    }
}


const getChequeRequest = () => {
    return {
        type: GET_CHEQUE_REQUEST
    }
}

const getChequeSuccess = cheque => {
    return {
        type: GET_CHEQUE_SUCCESS,
        payload: cheque
    }
}

const getChequeFailure = error => {
    return {
        type: GET_CHEQUE_FAILURE,
        payload: error
    }
}

export const getCheque = (id, token) => {
    return dispatch => {
        dispatch(getChequeRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/cheques/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getChequeSuccess(data));
        }).catch(error => {
            dispatch(getChequeFailure(error.response.data.message));
        });
    }
}


const updateChequeRequest = () => {
    return {
        type: UPDATE_CHEQUE_REQUEST
    }
}

const updateChequeSuccess = cheque => {
    return {
        type: UPDATE_CHEQUE_SUCCESS,
        payload: cheque
    }
}

const updateChequeFailure = error => {
    return {
        type: UPDATE_CHEQUE_FAILURE,
        payload: error
    }
}

export const updateCheque = (id, cheque, token) => {
    return dispatch => {
        dispatch(updateChequeRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL}/cheques/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: cheque
        }).then(res => {
            const {data} = res.data;
            dispatch(updateChequeSuccess(data));
        }).catch(error => {
            dispatch(updateChequeFailure(error.response.data.message));
        });
    }
}


const deleteChequeRequest = () => {
    return {
        type: DELETE_CHEQUE_REQUEST
    }
}

const deleteChequeSuccess = cheque => {
    return {
        type: DELETE_CHEQUE_SUCCESS,
        payload: cheque
    }
}

const deleteChequeFailure = error => {
    return {
        type: DELETE_CHEQUE_FAILURE,
        payload: error
    }
}

export const deleteCheque = (id, token) => {
    return dispatch => {
        dispatch(deleteChequeRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL}/cheques/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(deleteChequeSuccess(data));
        }).catch(error => {
            dispatch(deleteChequeFailure(error.response.data.message));
        });
    }
}


const getChequesRequest = () => {
    return {
        type: GET_CHEQUES_REQUEST
    }
}

const getChequesSuccess = cheques => {
    return {
        type: GET_CHEQUES_SUCCESS,
        payload: cheques
    }
}

const getChequesFailure = error => {
    return {
        type: GET_CHEQUES_FAILURE,
        payload: error
    }
}

export const getCheques = (token, showNotification) => {
    return dispatch => {
        dispatch(getChequesRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/cheques`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message} = res.data;
            dispatch(getChequesSuccess(data));
            showNotification(message, {variant: 'success'});
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(getChequesFailure(error.response.data.message));
        });
    }
}
