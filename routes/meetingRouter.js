/* Created by Amit khaduri */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Meetings = require('../models/meeting');
var Verify = require('./verify');
var meetingRouter = express.Router();
meetingRouter.use(bodyParser.json());

meetingRouter.route('/')

// get all meeting list.
// All users can see the list of meetings.

.get(function (req, res, next) {
    Meetings.find({}, function (err, meeting) {
        if (err) throw err;
        res.json(meeting);
    });
})

// Set a meeting.
// Only registered & login user can post a meeting.

.post(Verify.verifyLogin,function (req, res, next) {
    Meetings.create(req.body, function (err, meeting) {
        if (err) throw err;
        console.log('Meeting');
        var id = meeting._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the meeting with id: ' + id);
    });
});

meetingRouter.route('/:meetingId')

.get(function (req, res, next) {
    Meetings.findById(req.params.meetingId, function (err, meeting) {
        if (err) throw err;
        res.json(meeting);
    });
})

// update meeting.
// Only login user can update a meeting.

.put(function (req, res, next) {
    Meetings.findByIdAndUpdate(req.params.meetingId, {
        $set: req.body
    }, {
        new: true
    }, function (err, meeting) {
        if (err) throw err;
        res.json(meeting);
    });
})

// delete a meeting.

.delete(function (req, res, next) {
    Meetings.findByIdAndRemove(req.params.meetingId, function(err, resp) {       
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = meetingRouter;