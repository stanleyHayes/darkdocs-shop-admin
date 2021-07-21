import {cheques} from "./cheques.data";

const INITIAL_STATE = {
    cheques: [...cheques],
    loading: false,
    error: null,
    singleCheque: {}
};

const chequesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default chequesReducer;
