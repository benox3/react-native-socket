'use strict';

import React, { Component } from 'react-native';
import {bindActionCreators} from 'redux';
import Main from '../components/Main';
import * as mainActions from '../actions/mainActions';
import { fetchQuestionIfNeeded, receiveFetch } from '..//actions/mainActions';
import { connect } from 'react-redux';
import config from '../config'

var io = require('socket.io-client/socket.io');

class AppContainer extends Component {
    constructor(props) {
       super(props);
    }

  componentDidMount() {
    const { dispatch} = this.props
 
    dispatch(fetchQuestionIfNeeded())

    var socket = io('ws://' + config.host, {
        jsonp: false,
        transports: ['websocket']
    });

    socket.on('question submitted', function (data) {
         dispatch(receiveFetch(data));
    });
  }

    render() {
        const { state, actions } = this.props;
        return (
            <Main
                latest={state.latest}
                question={state.question}
                {...actions} />
        );
    }
}

function mapDispatchToProps(dispatch) {
    console.log(dispatch);
  return {
    actions: bindActionCreators(mainActions, dispatch),
    dispatch: dispatch
  }
}

function mapStateToProps(state) {
  return {
    state: state.main
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
