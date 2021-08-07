import {
    CREATE_BANK_FAILURE,
    CREATE_BANK_REQUEST,
    CREATE_BANK_SUCCESS, DELETE_BANK_FAILURE, DELETE_BANK_REQUEST, DELETE_BANK_SUCCESS,
    GET_BANKS_FAILURE,
    GET_BANKS_REQUEST,
    GET_BANKS_SUCCESS,
    UPDATE_BANK_FAILURE,
    UPDATE_BANK_REQUEST,
    UPDATE_BANK_SUCCESS
} from "./banks-action-types";

const INITIAL_STATE = {
    banks: [],
    loading: false,
    error: null,
    singleInstruction: {},
    banksCount: 0
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
                banks: action.payload.banks,
                banksCount: action.payload.banksCount
            }

        case GET_BANKS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                banks: [],
                banksCount: 0
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
                banks: [...state.banks, action.payload],
                banksCount: state.banksCount + 1
            }

        case CREATE_BANK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_BANK_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_BANK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                banks: [...state.banks.map(bank => {
                    if (bank._id === action.payload._id) {
                        return {...action.payload}
                    }
                    return bank;
                })]
            }

        case UPDATE_BANK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_BANK_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case DELETE_BANK_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                banks: [...state.banks.map(bank => {
                    if (bank._id === action.payload._id) {
                        return {...action.payload}
                    }
                    return bank;
                })]
            }

        case DELETE_BANK_FAILURE:
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
