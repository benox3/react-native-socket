'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import renderer from 'react-engine';
import io from 'socket.io';
import path from 'path';

import config from '../config/';
const app = express();
const server = require('http').Server(app);
const socket = io(server);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
const reactRoutesFilePath = path.join(__dirname, '../browser/Routes.jsx');
const engine = renderer.server.create({
    routes: require(reactRoutesFilePath),
    routesFilePath: reactRoutesFilePath
});

// set the engine
app.engine('.jsx', engine);
// set the view directory
app.set('views', path.join(__dirname, '/src/views'));
// set jsx as the view engine
app.set('view engine', 'jsx');
// finally, set the custom view
app.set('view', renderer.expressView);

app.use(express.static(path.join(__dirname, '/build')));

try {
    mongoose.connect(config.database_host);
} catch (e) {
    console.error(`Cannot find mongo connection,
                   please check /config/secrets.json`, e)
}


app.use('/', require('./routes/index')(socket));
app.use('/api', require('./routes/api')(socket));

app.use(function(err, req, res, next) {
    console.error(err);

    // http://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
      return next(err);
    }

    if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_REDIRECT) {
      return res.redirect(302, err.redirectLocation);
    }
    else if (err._type && err._type === ReactEngine.reactRouterServerErrors.MATCH_NOT_FOUND) {
      return res.status(404).send('Route Not Found!');
    }
    else {
      // for ReactEngine.reactRouterServerErrors.MATCH_INTERNAL_ERROR or
      // any other error we just send the error message back
      return res.status(500).send(err.message);
    }
});

server.listen(config.port, function () {
    console.log('Server listening on port %d', config.port);
});