import {combineReducers} from 'redux';
import authReducer from "./authentication/auth-reducer";
import ordersReducer from "./orders/order-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer
});

export default rootReducer;
