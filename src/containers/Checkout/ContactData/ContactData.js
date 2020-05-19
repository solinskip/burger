import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import classes from './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCOde: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Piotr Soliński',
                address: {
                    street: 'Ulica',
                    zipCode: '38-451',
                    country: 'Poland'
                },
                email: 'test@test.pl'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render() {
        let form = (<form>
            <input className={classes.Input} type='text' name='name'/>
            <input className={classes.Input} type='text' name='email'/>
            <input className={classes.Input} type='text' name='street'/>
            <input className={classes.Input} type='text' name='postalCode'/>
            <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>);

        if (this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;