import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';


const NavigationItem = (props) => {
    return props.visible === false
        ? null
        : (
            <li className={classes.NavigationItem}>
                <NavLink exact to={props.link} activeClassName={classes.active}>
                    {props.children}
                </NavLink>
            </li>
        );
};

export default NavigationItem;