import {
    CREATE_DUMP_FAILURE,
    CREATE_DUMP_REQUEST,
    CREATE_DUMP_SUCCESS,
    DELETE_DUMP_FAILURE,
    DELETE_DUMP_REQUEST,
    DELETE_DUMP_SUCCESS,
    GET_DUMPS_FAILURE,
    GET_DUMPS_REQUEST,
    GET_DUMPS_SUCCESS,
    UPDATE_DUMP_FAILURE,
    UPDATE_DUMP_REQUEST,
    UPDATE_DUMP_SUCCESS
} from "./dumps-action-types";

const INITIAL_STATE = {
    dumps: [],
    loading: false,
    error: null,
    singleDump: {},
    ccDumpsCount: 0
};

const dumpsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case CREATE_DUMP_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case CREATE_DUMP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                dumps: [...state.dumps, action.payload],
                ccDumpsCount: state.ccDumpsCount + 1
            }

        case CREATE_DUMP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case GET_DUMPS_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_DUMPS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                dumps: action.payload.dumps,
                ccDumpsCount: action.payload.ccDumpsCount
            }

        case GET_DUMPS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                dumps: [],
                ccDumpsCount: 0
            }

        case UPDATE_DUMP_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_DUMP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                dumps: [...state.dumps.map(dump => {
                    if (dump._id === action.payload._id) {
                        return {...action.payload};
                    }
                    return dump;
                })]
            }

        case UPDATE_DUMP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_DUMP_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case DELETE_DUMP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
                dumps: [...state.dumps.map(dump => {
                    if (dump._id === action.payload._id) {
                        return {...action.payload};
                    }
                    return dump;
                })]
            }

        case DELETE_DUMP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default dumpsReducer;
