import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem visible={props.isAuth} link='/orders'>Orders</NavigationItem>
        <NavigationItem visible={!props.isAuth} link='/auth'>Authenticate</NavigationItem>
        <NavigationItem visible={props.isAuth} link='/logout'>Logout</NavigationItem>
    </ul>
);

export default navigationItems;