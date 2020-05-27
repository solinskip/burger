import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData, {params: {auth: token,}})
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
}
const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
}
const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
}

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('orders.json', {
            params: {
                auth: token,
                orderBy: '"userId"',
                equalTo: `"${userId}"`
            }
        })
            .then(result => {
                const orders = [];
                for (let key in result.data) {
                    orders.push({
                        ...result.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error));
            });
    };
}


