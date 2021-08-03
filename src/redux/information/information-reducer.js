import {
    GET_INFORMATION_FAILURE,
    GET_INFORMATION_REQUEST,
    GET_INFORMATION_SUCCESS, UPDATE_INFORMATION_FAILURE,
    UPDATE_INFORMATION_REQUEST,
    UPDATE_INFORMATION_SUCCESS
} from "./information-action-types";

const INITIAL_STATE = {
    information: {},
    loading: false,
    error: null
};

const informationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_INFORMATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case GET_INFORMATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                information: action.payload
            }
        case GET_INFORMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_INFORMATION_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }
        case UPDATE_INFORMATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                information: {...state.information, email: action.payload.email, btcAddress: action.payload.btcAddress}
            }
        case UPDATE_INFORMATION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default informationReducer;
