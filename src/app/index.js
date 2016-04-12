'use strict';

import React, { Component, AppRegistry, Platform } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers/';
import AppContainer from './containers/AppContainer';

const reducer = combineReducers(reducers);
const store = createStore(
    reducer,
    applyMiddleware(thunk)
)
export default function index() {

class Root extends Component {

    render() {
        return (
        <Provider store={store}>
             <AppContainer/>
        </Provider>
      );
    }
  }

    AppRegistry.registerComponent('rns', () => Root);
}
