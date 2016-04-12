'use strict';

var React = require('react');

module.exports = React.createClass({
    render: function render() {
      return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>React Engine Example App</title>
                    <link rel='stylesheet' href='/styles.css'></link>
                </head>
                <body>
                    <div>
                        {/* Router now automatically populates this.props.children of your components based on the active route. https://github.com/rackt/react-router/blob/latest/CHANGES.md#routehandler */}
                        {this.props.children}
                    </div>
                    <script src='/bundle.js'></script>
                </body>
            </html>
        );
     }
});