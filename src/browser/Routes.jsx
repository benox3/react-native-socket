'use strict';

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Layout = require('./views/layout');
var ListPage = require('./views/list');

var routes = module.exports = (
    <Router>
        <Route path='/' component={Layout}>
            <IndexRoute component={ListPage} />
        </Route>
    </Router>
);