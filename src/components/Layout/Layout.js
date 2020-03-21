import React, {Component, Fragment} from 'react';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

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
            <Toolbar drawerToggleClicked={this.siteDrawerToggleHandler}/>
            <SideDrawer
                open={this.state.showSiteDrawer}
                closed={this.sideDrawerClosedHandler
                }/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Fragment>);
    }
}

export default Layout;