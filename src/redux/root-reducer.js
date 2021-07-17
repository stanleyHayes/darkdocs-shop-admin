import {combineReducers} from 'redux';
import authReducer from "./authentication/auth-reducer";
import ordersReducer from "./orders/order-reducer";
import instructionsReducer from "./instructions/instructions-reducer";
import usersReducer from "./users/user-reducer";
import banksReducer from "./banks/banks-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    instructions: instructionsReducer,
    users: usersReducer,
    banks: banksReducer
});

export default rootReducer;
