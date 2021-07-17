import thunk from "redux-thunk";
import {createStore, applyMiddleware} from "redux";
import rootReducer from "./root-reducer";
import {
    DARKDOCS_SHOP_ADMIN_ORDERS_KEY,
    DARKDOCS_SHOP_ADMIN_TOKEN_KEY, DARKDOCS_SHOP_ADMIN_USER_KEY,
} from "../constants/constants";

const token = localStorage.getItem(DARKDOCS_SHOP_ADMIN_TOKEN_KEY) ? JSON.parse(localStorage.getItem(DARKDOCS_SHOP_ADMIN_TOKEN_KEY)) : null;
const user = localStorage.getItem(DARKDOCS_SHOP_ADMIN_USER_KEY) ? JSON.parse(localStorage.getItem(DARKDOCS_SHOP_ADMIN_USER_KEY)) : null;
const orders = localStorage.getItem(DARKDOCS_SHOP_ADMIN_ORDERS_KEY) ? JSON.parse(localStorage.getItem(DARKDOCS_SHOP_ADMIN_ORDERS_KEY)) : [];

const INITIAL_STATE = {
    auth: {user, token},
    orders
};

const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));
export default store;
