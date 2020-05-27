import React, {Component} from 'react';
import {connect} from 'react-redux';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from './Auth.css';
import {auth, setAuthRedirectPatch} from '../../store/actions/index';
import Spinner from "../../components/UI/Spinner/Spinner";
import instance from "../../axios-orders";
import {Redirect} from 'react-router-dom';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup: true
    };

    componentDidMount() {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[inputIdentifier].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render() {
        const formElementsArray = [];
        for (let [id, config] of Object.entries(this.state.controls)) {
            formElementsArray.push({
                id: id,
                config: config
            })
        }

        let formElements = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            )
        );

        if (this.props.loading) {
            formElements = <Spinner/>
        }
        let errorMessage = null;
        if (this.props.error instanceof Object) {
            errorMessage = (
                <p style={{color: '#b52727'}}>{this.props.error.message}</p>
            )
        }

        if (this.props.isAuth) {
            return <Redirect to={this.props.authRedirectPath}/>;
        }

        return (
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    <h2>Login</h2>
                    {formElements}
                    {errorMessage}
                    <Button type='submit' btnType='Success'>{this.state.isSignup ? 'Register' : 'Login'}</Button>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType='Danger'>Switch to {this.state.isSignup ? 'signup' : 'signin'}</Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
};
}

function mapDispatchToProps(dispatch) {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(setAuthRedirectPatch('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);