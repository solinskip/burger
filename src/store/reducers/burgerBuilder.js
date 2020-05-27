import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const updateIngredient = (state, action, type) => {
    let ingredientPrice = INGREDIENT_PRICES[action.ingredientName];
    let ingredientCount = 1;
    if (type === 'remove') {
        ingredientPrice = ingredientPrice * (-1);
        ingredientCount = ingredientCount * (-1);
    }
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            // Override ingredient in coped ingredients
            [action.ingredientName]: state.ingredients[action.ingredientName] + ingredientCount
        },
        totalPrice: state.totalPrice + ingredientPrice,
        building: true
    };
}

const addIngredient = (state, action) => {
    return updateIngredient(state,action, 'add');
}
const removeIngredient = (state, action) => {
    return updateIngredient(state,action, 'remove');
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {...state, error: true};
        default:
            return state;
    }
};

export default reducer;