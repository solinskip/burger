import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
                key={ctrl.label}
                label={ctrl.label}
            />
        ))}
        <button
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{props.isAuth ? 'ORDER NO' : 'FIRST SIGNUP'}</button>
    </div>
);

export default buildControls;
