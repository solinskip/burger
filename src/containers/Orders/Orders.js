import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Order from "../../components/Order/Order";
import {fetchOrders} from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        return this.props.loading
            ? <Spinner/>
            : (
                <div>
                    {this.props.orders.map(order => (
                        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
                    ))}
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));