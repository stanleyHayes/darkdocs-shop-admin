import {combineReducers} from 'redux';
import authReducer from "./authentication/auth-reducer";
import ordersReducer from "./orders/order-reducer";
import instructionsReducer from "./instructions/instructions-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    instructions: instructionsReducer
});

export default rootReducer;
