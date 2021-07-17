import {banks} from "./banks.data";

const INITIAL_STATE = {
    banks: [...banks],
    loading: false,
    error: null,
    singleInstruction: {}
};

const banksReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default banksReducer;
