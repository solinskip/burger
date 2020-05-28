import React, {Component, Fragment, lazy, Suspense} from 'react';
import {connect} from 'react-redux';
import {Route, withRouter} from "react-router-dom";
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Auth from './containers/Auth/Auth';
import {checkAuthState} from './store/actions/index';
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Logout = lazy(() => import('./containers/Auth/Logout/Logout'));

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routesRequiringAuth = this.props.isAuth
            ? <Fragment>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/orders" component={Orders}/>
                <Route path="/logout" component={Logout}/>
            </Fragment>
            : null;

        return (
            <div>
                <Layout>
                    <Suspense fallback={<Spinner/>}>
                        <Route path="/" exact component={BurgerBuilder}/>
                        <Route path="/auth" component={Auth}/>
                        {routesRequiringAuth}
                    </Suspense>
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