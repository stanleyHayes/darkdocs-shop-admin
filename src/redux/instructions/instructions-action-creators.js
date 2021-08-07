import {
    ADD_INSTRUCTION_FAILURE,
    ADD_INSTRUCTION_REQUEST,
    ADD_INSTRUCTION_SUCCESS,
    DELETE_INSTRUCTION_FAILURE,
    DELETE_INSTRUCTION_REQUEST,
    DELETE_INSTRUCTION_SUCCESS,
    GET_INSTRUCTION_FAILURE,
    GET_INSTRUCTION_REQUEST,
    GET_INSTRUCTION_SUCCESS,
    GET_INSTRUCTIONS_FAILURE,
    GET_INSTRUCTIONS_REQUEST,
    GET_INSTRUCTIONS_SUCCESS,
    UPDATE_INSTRUCTION_FAILURE,
    UPDATE_INSTRUCTION_REQUEST,
    UPDATE_INSTRUCTION_SUCCESS
} from "./instructions-action-types";
import axios from "axios";
import {SERVER_BASE_URL} from "../../constants/constants";

const addInstructionRequest = () => {
    return {
        type: ADD_INSTRUCTION_REQUEST
    }
}

const addInstructionSuccess = instruction => {
    return {
        type: ADD_INSTRUCTION_SUCCESS,
        payload: instruction
    }
}

const addInstructionFailure = error => {
    return {
        type: ADD_INSTRUCTION_FAILURE,
        payload: error
    }
}

export const addInstruction = (instruction, token, showNotification) => {
    return dispatch => {
        dispatch(addInstructionRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL}/instructions`,
            headers: {Authorization: `Bearer ${token}`},
            data: instruction
        }).then(res => {
            const {data, message, success} = res.data;
            if (success) {
                dispatch(addInstructionSuccess(data));
                showNotification(message, {variant: 'success'});
            }
        }).catch(error => {
            console.log(error.response);
            const {message, success} = error && error.response && error.response.data;
            if (!success) {
                showNotification(message, {variant: 'error'});
                dispatch(addInstructionFailure(message));
            }
        });
    }
}


const getInstructionRequest = () => {
    return {
        type: GET_INSTRUCTION_REQUEST
    }
}

const getInstructionSuccess = instruction => {
    return {
        type: GET_INSTRUCTION_SUCCESS,
        payload: instruction
    }
}

const getInstructionFailure = error => {
    return {
        type: GET_INSTRUCTION_FAILURE,
        payload: error
    }
}

export const getInstruction = (id, token) => {
    return dispatch => {
        dispatch(getInstructionRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/instructions/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getInstructionSuccess(data));
        }).catch(error => {
            dispatch(getInstructionFailure(error.response.data.message));
        });
    }
}


const updateInstructionRequest = () => {
    return {
        type: UPDATE_INSTRUCTION_REQUEST
    }
}

const updateInstructionSuccess = instruction => {
    return {
        type: UPDATE_INSTRUCTION_SUCCESS,
        payload: instruction
    }
}

const updateInstructionFailure = error => {
    return {
        type: UPDATE_INSTRUCTION_FAILURE,
        payload: error
    }
}

export const updateInstruction = (id, instruction, token, showNotification) => {
    return dispatch => {
        dispatch(updateInstructionRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL}/instructions/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: instruction
        }).then(res => {
            const {data, message} = res.data;
            dispatch(updateInstructionSuccess(data));
            showNotification(message, {variant: 'success'});
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(updateInstructionFailure(error.response.data.message));
        });
    }
}


const deleteInstructionRequest = () => {
    return {
        type: DELETE_INSTRUCTION_REQUEST
    }
}

const deleteInstructionSuccess = instruction => {
    return {
        type: DELETE_INSTRUCTION_SUCCESS,
        payload: instruction
    }
}

const deleteInstructionFailure = error => {
    return {
        type: DELETE_INSTRUCTION_FAILURE,
        payload: error
    }
}

export const deleteInstruction = (id, token, showNotification) => {
    return dispatch => {
        dispatch(deleteInstructionRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL}/instructions/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message} = res.data;
            showNotification(message, {variant: 'success'});
            dispatch(deleteInstructionSuccess(data));
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(deleteInstructionFailure(error.response.data.message));
        });
    }
}


const getInstructionsRequest = () => {
    return {
        type: GET_INSTRUCTIONS_REQUEST
    }
}

const getInstructionsSuccess = (instructions, instructionsCount) => {
    return {
        type: GET_INSTRUCTIONS_SUCCESS,
        payload: {instructions, instructionsCount}
    }
}

const getInstructionsFailure = error => {
    return {
        type: GET_INSTRUCTIONS_FAILURE,
        payload: error
    }
}

export const getInstructions = (token, query, showNotification) => {
    return dispatch => {
        dispatch(getInstructionsRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/instructions?${query}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message, instructionsCount} = res.data;
            if (data) {
                dispatch(getInstructionsSuccess(data, instructionsCount));
                showNotification(message, {variant: 'success'});
            }
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'success'});
            dispatch(getInstructionsFailure(error.response.data.message));
        });
    }
}
