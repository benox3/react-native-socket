'use strict';

// import the react-router routes
var Routes = require('./Routes.jsx');

// import the react-engine's client side booter
var ReactEngineClient = require('react-engine/lib/client');

// boot options
var options = {
    routes: Routes,

    // supply a function that can be called
    // to resolve the file that was rendered.
    viewResolver: function(viewName) {
        return require('./views/' + viewName);
    }
};

document.addEventListener('DOMContentLoaded', function onLoad() {
    // boot the app when the DOM is ready
    ReactEngineClient.boot(options);
});