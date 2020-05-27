import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildsControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {addIngredient, initIngredients, purchaseInit, removeIngredient, setAuthRedirectPatch} from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandel = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandel = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    };

    render() {
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;
        let orderSummary;
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        if (this.props.ings) {
            burger = <Fragment>
                <Burger ingredients={this.props.ings}/>
                <BuildControls
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemoved={this.props.onRemoveIngredient}
                    ordered={this.purchaseHandler}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    price={this.props.price}
                    disabled={disabledInfo}
                    isAuth={this.props.isAuth}
                />
            </Fragment>;
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                totalPrice={this.props.price}
                purchaseCancelled={this.purchaseCancelHandel}
                purchaseContinued={this.purchaseContinueHandel}
            />;
        }

        return (
            <Fragment>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandel}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToPros = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(initIngredients()),
        onAddIngredient: (ingName) => dispatch(addIngredient(ingName)),
        onRemoveIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        onInitPurchased: () => dispatch(purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(setAuthRedirectPatch(path))
    };
};

export default connect(mapStateToPros, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));