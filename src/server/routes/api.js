'use strict';

var Question = require('../../common/models/question.js');
var router = require('express').Router();

module.exports = function(io) {

    router.get('/latest', function onGetIndex(req, res) {
        Question.findOne({}, {}, { sort: { 'date' : -1 } }, function(err, post) {
          var question = post ? post.description : 'No questions yet';
            res.json({
                question: question
            });
        });
    });

    router.post('/submit', function (req, res) {
       io.sockets.emit('question submitted', req.body);
       var question = new Question({ description: req.body.question});
       question.save();
       res.send(req.body)
  });

    return router
}