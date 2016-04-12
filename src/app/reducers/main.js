'use strict';

import * as types from '../actions/actionTypes';
import config from '../config';

window.navigator.userAgent = "react-native";

const initialState = {
    isFetching: true,
    question: '',
    latest: ''
};

export default function main(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_LATEST:
            return
        case types.RECEIVE_FETCH:
        console.log(action);
            return {
                ...state,
                isFetching: false,
                latest: action.question
            };
        case types.SET_TEXT:
            return {
                ...state,
                question: action.question
            };
        case types.SUBMIT_QUESTION:
            fetch('http://' + config.host + '/api/submit', {
                method: 'POST',
                headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: state.question
                })
            });
            return state;
        default:
            return state;
    }
}
