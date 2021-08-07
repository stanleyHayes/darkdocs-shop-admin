import {
    CREATE_BANK_FAILURE,
    CREATE_BANK_REQUEST,
    CREATE_BANK_SUCCESS,
    DELETE_BANK_FAILURE,
    DELETE_BANK_REQUEST,
    DELETE_BANK_SUCCESS,
    GET_BANK_FAILURE,
    GET_BANK_REQUEST,
    GET_BANK_SUCCESS,
    GET_BANKS_FAILURE,
    GET_BANKS_REQUEST,
    GET_BANKS_SUCCESS,
    UPDATE_BANK_FAILURE,
    UPDATE_BANK_REQUEST,
    UPDATE_BANK_SUCCESS
} from "./banks-action-types";
import axios from "axios";
import {SERVER_BASE_URL} from "../../constants/constants";

const createBankRequest = () => {
    return {
        type: CREATE_BANK_REQUEST
    }
}

const createBankSuccess = bank => {
    return {
        type: CREATE_BANK_SUCCESS,
        payload: bank
    }
}

const createBankFailure = error => {
    return {
        type: CREATE_BANK_FAILURE,
        payload: error
    }
}

export const createBank = (bank, token, showNotification) => {
    return dispatch => {
        dispatch(createBankRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL}/banks`,
            headers: {Authorization: `Bearer ${token}`},
            data: bank
        }).then(res => {
            const {data, message} = res.data;
            dispatch(createBankSuccess(data));
            showNotification(message, {variant: 'success'});
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(createBankFailure(error.response.data.message));
        });
    }
}


const getBankRequest = () => {
    return {
        type: GET_BANK_REQUEST
    }
}

const getBankSuccess = bank => {
    return {
        type: GET_BANK_SUCCESS,
        payload: bank
    }
}

const getBankFailure = error => {
    return {
        type: GET_BANK_FAILURE,
        payload: error
    }
}

export const getBank = (id, token) => {
    return dispatch => {
        dispatch(getBankRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/banks/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getBankSuccess(data));
        }).catch(error => {
            dispatch(getBankFailure(error.response.data.message));
        });
    }
}


const updateBankRequest = () => {
    return {
        type: UPDATE_BANK_REQUEST
    }
}

const updateBankSuccess = bank => {
    return {
        type: UPDATE_BANK_SUCCESS,
        payload: bank
    }
}

const updateBankFailure = error => {
    return {
        type: UPDATE_BANK_FAILURE,
        payload: error
    }
}

export const updateBank = (id, bank, token, showNotification) => {
    return dispatch => {
        dispatch(updateBankRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL}/banks/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: bank
        }).then(res => {
            const {data, message} = res.data;
            showNotification(message, {variant: 'success'});
            dispatch(updateBankSuccess(data));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'success'});
            dispatch(updateBankFailure(error.response.data.message));
        });
    }
}


const deleteBankRequest = () => {
    return {
        type: DELETE_BANK_REQUEST
    }
}

const deleteBankSuccess = bank => {
    return {
        type: DELETE_BANK_SUCCESS,
        payload: bank
    }
}

const deleteBankFailure = error => {
    return {
        type: DELETE_BANK_FAILURE,
        payload: error
    }
}

export const deleteBank = (id, token) => {
    return dispatch => {
        dispatch(deleteBankRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL}/banks/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(deleteBankSuccess(data));
        }).catch(error => {
            dispatch(deleteBankFailure(error.response.data.message));
        });
    }
}


const getBanksRequest = () => {
    return {
        type: GET_BANKS_REQUEST
    }
}

const getBanksSuccess = (banks, banksCount) => {
    return {
        type: GET_BANKS_SUCCESS,
        payload: {banks, banksCount}
    }
}

const getBanksFailure = error => {
    return {
        type: GET_BANKS_FAILURE,
        payload: error
    }
}

export const getBanks = (token, query, showNotification) => {
    return dispatch => {
        dispatch(getBanksRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/banks${query ? `?${query}` : ''}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message, banksCount} = res.data;
            if (showNotification)
                showNotification(message, {variant: 'success'});
            dispatch(getBanksSuccess(data, banksCount));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(getBanksFailure(error.response.data.message));
        });
    }
}
