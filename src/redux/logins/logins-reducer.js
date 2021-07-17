import {logins} from "./logins.data";

const INITIAL_STATE = {
    logins: [...logins],
    loading: false,
    error: null,
    singleLogin: {}
};

const loginsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default loginsReducer;
