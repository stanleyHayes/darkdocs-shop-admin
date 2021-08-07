import {GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS} from "./order-action-types";

const INITIAL_STATE = {
    orders: [],
    loading: false,
    error: null,
    singleOrder: {},
    ordersCount: 0
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
                orders: action.payload.orders,
                ordersCount: action.payload.ordersCount
            }

        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: "",
                orders: [],
                ordersCount: 0
            }
        default:
            return state;
    }
}

export default ordersReducer;
