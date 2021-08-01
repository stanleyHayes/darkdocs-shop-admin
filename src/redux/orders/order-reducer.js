import {GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "./order-action-types";

const INITIAL_STATE = {
    orders: [],
    loading: false,
    error: null,
    singleOrder: {}
};

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                orders: action.payload
            }

        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: "",
                orders: []
            }
        default:
            return state;
    }
}

export default ordersReducer;
