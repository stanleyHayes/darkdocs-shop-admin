import {
    GET_FUNDS_FAILURE,
    GET_FUNDS_REQUEST,
    GET_FUNDS_SUCCESS,
    UPDATE_FUND_FAILURE,
    UPDATE_FUND_REQUEST,
    UPDATE_FUND_SUCCESS
} from "./funds-action-types";

const INITIAL_STATE = {
    funds: [],
    loading: false,
    error: null,
    singleFund: {}
};

const fundsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_FUNDS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_FUNDS_SUCCESS:
            return {
                ...state,
                loading: false,
                funds: action.payload,
                error: ""
            }

        case GET_FUNDS_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.payload,
                funds: []
            }


        case UPDATE_FUND_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_FUND_SUCCESS:
            return {
                ...state,
                loading: false,
                funds: [...state.funds.map(fund => {
                    if (fund._id === action.payload._id)
                        return {...action.payload};
                    return fund
                })],
                error: ""
            }

        case UPDATE_FUND_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default fundsReducer;
