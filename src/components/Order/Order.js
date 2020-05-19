import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName: string in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    const ingredientsOutput = ingredients.map(ingredient => {
        return <span key={ingredient.name} className={classes.OrderOutput}>
            {ingredient.name} ({ingredient.amount})
        </span>;
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>{parseFloat(props.price).toFixed(2)} USD</strong></p>
        </div>
    );
};

export default order;
