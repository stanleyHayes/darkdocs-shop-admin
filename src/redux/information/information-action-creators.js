import axios from "axios";
import {SERVER_BASE_URL} from "../../constants/constants";
import {
    GET_INFORMATION_FAILURE,
    GET_INFORMATION_REQUEST,
    GET_INFORMATION_SUCCESS,
    UPDATE_INFORMATION_FAILURE,
    UPDATE_INFORMATION_REQUEST,
    UPDATE_INFORMATION_SUCCESS
} from "./information-action-types";


const getInformationRequest = () => {
    return {
        type: GET_INFORMATION_REQUEST
    }
}

const getInformationSuccess = information => {
    return {
        type: GET_INFORMATION_SUCCESS,
        payload: information
    }
}

const getInformationFailure = error => {
    return {
        type: GET_INFORMATION_FAILURE,
        payload: error
    }
}

export const getInformation = (token) => {
    return dispatch => {
        dispatch(getInformationRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/information`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            console.log(data);
            dispatch(getInformationSuccess(data));
        }).catch(error => {
            dispatch(getInformationFailure(error.response.data.message));
        });
    }
}


const updateInformationRequest = () => {
    return {
        type: UPDATE_INFORMATION_REQUEST
    }
}

const updateInformationSuccess = information => {
    return {
        type: UPDATE_INFORMATION_SUCCESS,
        payload: information
    }
}

const updateInformationFailure = error => {
    return {
        type: UPDATE_INFORMATION_FAILURE,
        payload: error
    }
}

export const updateInformation = (information, token, history) => {
    console.log('update information');
    return dispatch => {
        dispatch(updateInformationRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL}/information`,
            headers: {Authorization: `Bearer ${token}`},
            data: information
        }).then(res => {
            const {data} = res.data;
            dispatch(updateInformationSuccess(data));
            history.push('/')
        }).catch(error => {
            dispatch(updateInformationFailure(error.response.data.message));
        });
    }
}
