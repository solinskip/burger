import React from 'react';
import classes from './Button.css';

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}
        type={props.type ? props.type : 'button'}
    >
        {props.children}
    </button>
);

export default button;