import {instructions} from "./instructions.data";

const INITIAL_STATE = {
    instructions: [...instructions],
    loading: false,
    error: null,
    singleInstruction: {}
};

const instructionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){
        default:
            return state;
    }
}

export default instructionsReducer;