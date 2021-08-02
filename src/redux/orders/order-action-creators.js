import axios from "axios";
import {SERVER_BASE_URL} from "../../constants/constants";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    GET_ORDER_FAILURE,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    UPDATE_ORDER_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS
} from "./order-action-types";

const createOrderRequest = () => {
    return {
        type: CREATE_ORDER_REQUEST
    }
}

const createOrderSuccess = order => {
    return {
        type: CREATE_ORDER_SUCCESS,
        payload: order
    }
}

const createOrderFailure = error => {
    return {
        type: CREATE_ORDER_FAILURE,
        payload: error
    }
}

export const createOrder = (order, token) => {
    return dispatch => {
        dispatch(createOrderRequest());
        axios({
            method: 'post',
            url: `${SERVER_BASE_URL}/orders`,
            headers: {Authorization: `Bearer ${token}`},
            data: order
        }).then(res => {
            const {data} = res.data;
            dispatch(createOrderSuccess(data));
        }).catch(error => {
            dispatch(createOrderFailure(error.response.data.message));
        });
    }
}


const getOrderRequest = () => {
    return {
        type: GET_ORDER_REQUEST
    }
}

const getOrderSuccess = order => {
    return {
        type: GET_ORDER_SUCCESS,
        payload: order
    }
}

const getOrderFailure = error => {
    return {
        type: GET_ORDER_FAILURE,
        payload: error
    }
}

export const getOrder = (id, token) => {
    return dispatch => {
        dispatch(getOrderRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/orders/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(getOrderSuccess(data));
        }).catch(error => {
            dispatch(getOrderFailure(error.response.data.message));
        });
    }
}


const updateOrderRequest = () => {
    return {
        type: UPDATE_ORDER_REQUEST
    }
}

const updateOrderSuccess = order => {
    return {
        type: UPDATE_ORDER_SUCCESS,
        payload: order
    }
}

const updateOrderFailure = error => {
    return {
        type: UPDATE_ORDER_FAILURE,
        payload: error
    }
}

export const updateOrder = (id, order, token) => {
    return dispatch => {
        dispatch(updateOrderRequest());
        axios({
            method: 'put',
            url: `${SERVER_BASE_URL}/orders/${id}`,
            headers: {Authorization: `Bearer ${token}`},
            data: order
        }).then(res => {
            const {data} = res.data;
            dispatch(updateOrderSuccess(data));
        }).catch(error => {
            dispatch(updateOrderFailure(error.response.data.message));
        });
    }
}


const deleteOrderRequest = () => {
    return {
        type: DELETE_ORDER_REQUEST
    }
}

const deleteOrderSuccess = order => {
    return {
        type: DELETE_ORDER_SUCCESS,
        payload: order
    }
}

const deleteOrderFailure = error => {
    return {
        type: DELETE_ORDER_FAILURE,
        payload: error
    }
}

export const deleteOrder = (id, token) => {
    return dispatch => {
        dispatch(deleteOrderRequest());
        axios({
            method: 'delete',
            url: `${SERVER_BASE_URL}/orders/${id}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data} = res.data;
            dispatch(deleteOrderSuccess(data));
        }).catch(error => {
            dispatch(deleteOrderFailure(error.response.data.message));
        });
    }
}


const getOrdersRequest = () => {
    return {
        type: GET_ORDERS_REQUEST
    }
}

const getOrdersSuccess = orders => {
    return {
        type: GET_ORDERS_SUCCESS,
        payload: orders
    }
}

const getOrdersFailure = error => {
    return {
        type: GET_ORDERS_FAILURE,
        payload: error
    }
}

export const getOrders = (token, query, showNotification) => {
    return dispatch => {
        dispatch(getOrdersRequest());
        axios({
            method: 'get',
            url: `${SERVER_BASE_URL}/orders${query ? `?${query}` : ''}`,
            headers: {Authorization: `Bearer ${token}`}
        }).then(res => {
            const {data, message} = res.data;
            dispatch(getOrdersSuccess(data));
            showNotification(message, {variant: 'success'});
        }).catch(error => {
            showNotification(error.response.data.message, {variant: 'error'});
            dispatch(getOrdersFailure(error.response.data.message));
        });
    }
}
