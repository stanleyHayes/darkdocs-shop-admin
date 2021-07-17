import {funds} from "./funds.data";

const INITIAL_STATE = {
    funds: [...funds],
    loading: false,
    error: null,
    singleFund: {}
};

const fundsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default fundsReducer;
