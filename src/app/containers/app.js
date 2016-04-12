'use strict';

import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import AppContainer from './AppContainer';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default class App extends Component {

    render() {
        return (
        <Provider store={store}>
             <AppContainer/>
        </Provider>
      );
    }
}
