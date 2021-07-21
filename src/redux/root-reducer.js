import {combineReducers} from 'redux';
import authReducer from "./authentication/auth-reducer";
import ordersReducer from "./orders/order-reducer";
import instructionsReducer from "./instructions/instructions-reducer";
import usersReducer from "./users/users-reducer";
import banksReducer from "./banks/banks-reducer";
import fundsReducer from "./funds/funds-reducer";
import loginsReducer from "./logins/logins-reducer";
import dumpsReducer from "./dumps/dumps-reducer";
import informationReducer from "./information/information-reducer";
import chequesReducer from "./cheques/cheques-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    orders: ordersReducer,
    instructions: instructionsReducer,
    users: usersReducer,
    banks: banksReducer,
    funds: fundsReducer,
    logins: loginsReducer,
    dumps: dumpsReducer,
    information: informationReducer,
    cheques: chequesReducer
});

export default rootReducer;
