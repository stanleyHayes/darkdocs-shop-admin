import {information} from "./information.data";

const INITIAL_STATE = {
    information,
    loading: false,
    error: null
};

const informationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default informationReducer;
