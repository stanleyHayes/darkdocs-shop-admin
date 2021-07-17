import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import rootReducer from "./root-reducer";
import {
    DARKDOCS_SHOP_ADMIN_TOKEN_KEY,
    DARKDOCS_SHOP_ADMIN_USER_KEY,
} from "../constants/constants";

const token = localStorage.getItem(DARKDOCS_SHOP_ADMIN_TOKEN_KEY) ? JSON.parse(localStorage.getItem(DARKDOCS_SHOP_ADMIN_TOKEN_KEY)) : null;
const user = localStorage.getItem(DARKDOCS_SHOP_ADMIN_USER_KEY) ? JSON.parse(localStorage.getItem(DARKDOCS_SHOP_ADMIN_USER_KEY)) : null;

const INITIAL_STATE = {
    auth: {user, token}
};

const store = createStore(rootReducer, INITIAL_STATE, applyMiddleware(thunk));
export default store;
