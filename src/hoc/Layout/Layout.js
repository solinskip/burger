import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSiteDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSiteDrawer: false});
    };

    siteDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSiteDrawer: !prevState.showSiteDrawer}
        });
    };

    render() {
        return (<Fragment>
            <Toolbar
                drawerToggleClicked={this.siteDrawerToggleHandler}
                isAuth={this.props.isAuthenticated}/>
            <SideDrawer
                open={this.state.showSiteDrawer}
                closed={this.sideDrawerClosedHandler}
                isAuth={this.props.isAuthenticated}/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Fragment>);
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);