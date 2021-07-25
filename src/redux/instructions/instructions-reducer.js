import {
    GET_INSTRUCTIONS_FAILURE,
    GET_INSTRUCTIONS_REQUEST,
    GET_INSTRUCTIONS_SUCCESS
} from "./instructions-action-types";

const INITIAL_STATE = {
    instructions: [],
    loading: false,
    error: null,
    singleInstruction: {}
};

const instructionsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_INSTRUCTIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_INSTRUCTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                instructions: action.payload
            }

        case GET_INSTRUCTIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                instructions: []
            }
        default:
            return state;
    }
}

export default instructionsReducer;
