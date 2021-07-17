import {orders} from "./orders.data";

const INITIAL_STATE = {
    orders: [...orders],
    loading: false,
    error: null,
    singleOrder: {}
};

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default ordersReducer;
