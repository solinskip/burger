import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildsControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false
    };

    // componentDidMount() {
    //     axios.get('https://react-burger-e56f2.firebaseio.com/ingredients.json')
    //         .then(response => {
    //                 this.setState({ingredients: response.data});
    //             }
    //         )
    // }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandel = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandel = () => {
        this.props.history.push('/checkout');
    };

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };
    //
    // removeIngredientHandler = (type) => {
    //     const oldIngredientCount = this.state.ingredients[type];
    //     const oldPrice = this.state.totalPrice;
    //     if (oldIngredientCount <= 0) {
    //         return;
    //     }
    //     const updatedIngredients = {...this.state.ingredients};
    //     updatedIngredients[type] = oldIngredientCount - 1;
    //
    //
    //     this.setState({totalPrice: oldPrice - INGREDIENT_PRICES[type], ingredients: updatedIngredients});
    //     this.updatePurchaseState(updatedIngredients);
    // };

    render() {
        let [burger, orderSummary] = Array(6).fill(<Spinner/>);
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
                />
            </Fragment>;
            if (!this.state.loading) {
                orderSummary = <OrderSummary
                    ingredients={this.props.ings}
                    totalPrice={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandel}
                    purchaseContinued={this.purchaseContinueHandel}
                />;
            }
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
        ings: state.ingredients,
        price: state.totalPrice
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
};

export default connect(mapStateToPros, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));