'use strict';

var router = require('express').Router();
var Question = require('../../common/models/question.js');

module.exports = function() {
    router.get('/', function onGetIndex(req, res) {
        Question.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, post) {
            var question = post ? post.description : 'No questions yet';
            res.render(req.originalUrl, {
                question: question
            });
        });
    });
    return router;
}