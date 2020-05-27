import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {checkAuthState} from './store/actions/index';

// const Checkout = lazy(() => import('./containers/Checkout/Checkout'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = this.props.isAuth
            ? <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
            </Switch>
            : null;

        return (
            <div>
                <Layout>
                    <Route path="/" exact component={BurgerBuilder}/>
                    <Route path="/auth" component={Auth}/>
                    {/*<Route path="/checkout" render={() => <Suspense fallback={<div>Loading..</div>}><Checkout/></Suspense>}/>*/}
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(checkAuthState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
