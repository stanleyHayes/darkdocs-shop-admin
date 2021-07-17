import {dumps} from "./dumps.data";

const INITIAL_STATE = {
    dumps: [...dumps],
    loading: false,
    error: null,
    singleDump: {}
};

const dumpsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default dumpsReducer;
