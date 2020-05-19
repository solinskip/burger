import React, {Component, lazy, Suspense} from 'react';
import { Route } from "react-router-dom";
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import Orders from "./containers/Orders/Orders";

// const Checkout = lazy(() => import('./containers/Checkout/Checkout'));

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Route path="/" exact component={BurgerBuilder}/>
                    {/*<Route path="/checkout" render={() => <Suspense fallback={<div>Loading..</div>}><Checkout/></Suspense>}/>*/}
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                </Layout>
            </div>
        );
    }
}

export default App;
