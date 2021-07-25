import {
    ADD_INSTRUCTION_FAILURE,
    ADD_INSTRUCTION_REQUEST,
    ADD_INSTRUCTION_SUCCESS,
    DELETE_INSTRUCTION_FAILURE,
    DELETE_INSTRUCTION_REQUEST,
    DELETE_INSTRUCTION_SUCCESS,
    GET_INSTRUCTIONS_FAILURE,
    GET_INSTRUCTIONS_REQUEST,
    GET_INSTRUCTIONS_SUCCESS,
    UPDATE_INSTRUCTION_FAILURE,
    UPDATE_INSTRUCTION_REQUEST,
    UPDATE_INSTRUCTION_SUCCESS
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

        case ADD_INSTRUCTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case ADD_INSTRUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                instructions: [...state.instructions, action.payload]
            }

        case ADD_INSTRUCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_INSTRUCTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_INSTRUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                instructions: [...state.instructions.map(instruction => {
                    if (instruction._id === action.payload._id) {
                        return {...action.payload};
                    }
                    return instruction;
                })]
            }

        case UPDATE_INSTRUCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case DELETE_INSTRUCTION_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case DELETE_INSTRUCTION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                instructions: [...state.instructions.filter(instruction => instruction._id !== action.payload._id)]
            }

        case DELETE_INSTRUCTION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }
}

export default instructionsReducer;
