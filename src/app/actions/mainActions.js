'use strict';

import * as types from './actionTypes';
import config from '../config'

export function submitQuestion() {
    return {
        type: types.SUBMIT_QUESTION
    };
}

export function getLatest() {
    return {
        type: types.GET_LATEST
    };
}


export function setText(value) {
    return {
        type: types.SET_TEXT,
        question: value
    };
}

export function receiveFetch(response) {
    return {
        type: types.RECEIVE_FETCH,
        question: response.question,
        isFetching: false
    }
}

function fetchQuestion() {
    return dispatch => {
        return fetch('http://' + config.host + '/api/latest').then((response) => {
            dispatch(receiveFetch(JSON.parse(response._bodyText)));
        })
    }
    
}

export function fetchQuestionIfNeeded() {
    return (dispatch, getState) => {
        return dispatch(fetchQuestion());
    };
}