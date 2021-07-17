import {
    CREATE_BANK_SUCCESS,
    DELETE_BANK_SUCCESS,
    DELETE_BANK_FAILURE,
    DELETE_BANK_REQUEST,
    GET_BANK_FAILURE,
    GET_BANKS_FAILURE,
    GET_BANKS_REQUEST,
    UPDATE_BANK_FAILURE,
    GET_BANK_SUCCESS,
    GET_BANKS_SUCCESS,
    UPDATE_BANK_REQUEST,
    UPDATE_BANK_SUCCESS,
    CREATE_BANK_FAILURE,
    GET_BANK_REQUEST,
    CREATE_BANK_REQUEST
} from "./banks-action-types";
import axios from "axios";
import {DEVELOPMENT_SERVER} from "../../constants/constants";

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

export const createBank = (bank, token) => {
    return dispatch => {
        dispatch(createBankRequest());
        axios({
            method: 'post',
            url: `${DEVELOPMENT_SERVER}/banks`,
            headers: {Authorization: `Bearer ${token}`},
            data: bank
        }).then(res => {
            const {data} = res.data;
            dispatch(createBankSuccess(data));
        }).catch(error => {
            dispatch(createBankFailure(error.response.data.message));
        });
    }
}


const getBankRequest = () => {
    return {
        type: GET_BANK_REQUEST
    }
}

const getBankSuccess = instruction => {
    return {
        type: GET_BANK_SUCCESS,
        payload: instruction
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
            url: `${DEVELOPMENT_SERVER}/banks/${id}`,
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

export const updateBank = (id, bank, token) => {
    return dispatch => {
        dispatch(updateBankRequest());
        axios({
            method: 'put',
            url: `${DEVELOPMENT_SERVER}/banks/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: bank
        }).then(res => {
            const {data} = res.data;
            dispatch(updateBankSuccess(data));
        }).catch(error => {
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
            url: `${DEVELOPMENT_SERVER}/banks/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(deleteBankSuccess(data));
        }).catch(error => {
            dispatch(deleteBankFailure(error.response.data.message));
        });
    }
}


const getBankSRequest = () => {
    return {
        type: GET_BANKS_REQUEST
    }
}

const getBanksSuccess = banks => {
    return {
        type: GET_BANKS_SUCCESS,
        payload: banks
    }
}

const getBanksFailure = error => {
    return {
        type: GET_BANKS_FAILURE,
        payload: error
    }
}

export const getBanks = (token) => {
    return dispatch => {
        dispatch(getBankSRequest());
        axios({
            method: 'get',
            url: `${DEVELOPMENT_SERVER}/banks`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getBanksSuccess(data));
        }).catch(error => {
            dispatch(getBanksFailure(error.response.data.message));
        });
    }
}
