module.exports = function(app, variable) {

    // Init config
    app.set('view engine', 'jade');

    // Modules
    const util = require('util');
    const path = require('path');
    const fs = require('fs');
    const pBluebird = require('bluebird');
    const moment = require('moment');
    const moongose = require('mongoose');
    const Services = require('./services');
    // Variables
    let promises = [];
    let promisesForm = [];
    let promisesFee = [];
    let promisePreOrder = [];
    let data = {};
    let cms = {};
    let form = {};
    // Models
    const Theater = require('../models/theaters');
    const Movie = require('../models/movies');

    app.get('/', function (req, res) {
     res.render('index')
    });


    // ************ CMS ************
    app.get('/cms', function (req, res) {
        res.render('cms/index', {title: 'CMS'})
    });
    app.get('/cms/theaters/list', function (req, res) {
        Theater.find()
            .populate('theaterID')
            .exec( function(err, data) {
                if (err) {
                    res.send(err);
                }else if(data){
                    res.json(data);
                }else{res.send({msg:'HELLO'});}

            });
    });
    app.get('/cms/theaters/add', function (req, res) {
        const theater = new Theater;
        const today = moment();
        theater.createAt = today;
        theater.updateAt = today;
        theater.save().then(function(snap, arr) {
            res.send(snap);
        });
    });
    app.post('/cms/theaters/edit', function (req, res) {
        const data = req.body;
        Theater.findByIdAndUpdate(data.id, data, {upsert:true}, function(err, snap){
            if (err) res.json(err);
            res.json(snap)
        });
    });
    app.post('/cms/theaters/delete', function (req, res) {
        const data = req.body;
        Theater.findByIdAndRemove(data.id, {}, function(err, snap){
            if (err) res.json(err);
            res.json(snap)
        });
    });
    app.get('/api/session', function (req, res) {
        const token = req.headers['authorization'];
        res.json(Services.verifyToken(token));
    })

};