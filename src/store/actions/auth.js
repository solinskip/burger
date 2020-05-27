import * as actionTypes from './actionTypes';
import axios from 'axios';
import React from "react";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}
export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                dispatch(authSuccess(token, localStorage.getItem('userId')));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const url = isSignup
            ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhStBfJQqFRiuj19F9EiGq4ARs2-qwxFw'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhStBfJQqFRiuj19F9EiGq4ARs2-qwxFw'

        axios.post(url, {
            email: email,
            password: password,
            returnSecureToken: true
        })
            .then(response => {
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authSuccess(response.data.idToken, response.data.localId));
                    dispatch(checkAuthTimeout(response.data.expiresIn))
                }
            )
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const setAuthRedirectPatch = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATCH,
        path: path
    }
}