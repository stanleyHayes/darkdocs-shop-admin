import {
    CREATE_BANK_FAILURE,
    CREATE_BANK_REQUEST,
    CREATE_BANK_SUCCESS,
    GET_BANKS_FAILURE,
    GET_BANKS_REQUEST,
    GET_BANKS_SUCCESS
} from "./banks-action-types";

const INITIAL_STATE = {
    banks: [],
    loading: false,
    error: null,
    singleInstruction: {}
};

const banksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_BANKS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_BANKS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                banks: action.payload
            }

        case GET_BANKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                banks: []
            }

        case CREATE_BANK_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case CREATE_BANK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                banks: [...state.banks, action.payload]
            }

        case CREATE_BANK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default banksReducer;
