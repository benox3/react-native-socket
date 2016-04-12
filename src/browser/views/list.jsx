'use strict';

var React = require('react');
var _ = require('lodash');
var socket = require('socket.io-client')('http://mighty-lake-68738.herokuapp.com/');

module.exports = React.createClass({
    getInitialState: function() {
        return _.cloneDeep(this.props);
    },

    componentDidMount: function() {
        var self = this;
        socket.on('connect', function(){
           console.log('connected')
        });
        socket.on('question submitted', function (data) {
            console.log(data)
            self.setState({'question': data.question});
            socket.emit('my other event', { my: 'data' });
        });

        
    },
    render: function render() {
        return (
            <div id='list'>
                <h1>{this.state.question}</h1>
            </div>
      );
  }
});