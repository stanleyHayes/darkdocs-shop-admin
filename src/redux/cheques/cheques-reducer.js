import {
    GET_CHEQUES_FAILURE,
    GET_CHEQUES_REQUEST,
    GET_CHEQUES_SUCCESS,
    UPDATE_CHEQUE_FAILURE,
    UPDATE_CHEQUE_REQUEST,
    UPDATE_CHEQUE_SUCCESS
} from "./cheques-action-types";

const INITIAL_STATE = {
    cheques: [],
    loading: false,
    error: null,
    singleCheque: {}
};

const chequesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CHEQUES_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case GET_CHEQUES_SUCCESS:
            return {
                ...state,
                loading: false,
                cheques: action.payload,
                error: ""
            }

        case GET_CHEQUES_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.payload,
                cheques: []
            }

        case UPDATE_CHEQUE_REQUEST:
            return {
                ...state,
                loading: true,
                error: ""
            }

        case UPDATE_CHEQUE_SUCCESS:
            return {
                ...state,
                loading: false,
                cheques: [...state.cheques.map(cheque => {
                    if (action.payload._id === cheque._id)
                        return {...action.payload};
                    return cheque;
                })],
                error: ""
            }

        case UPDATE_CHEQUE_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export default chequesReducer;
