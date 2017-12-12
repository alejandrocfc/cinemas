module.exports = function(app, variable) {

    // Init config
    app.set('view engine', 'jade');

    // Modules
    let util = require('util');
    let path = require('path');
    let fs = require('fs');
    let pBluebird = require('bluebird');
    let moment = require('moment');
    let moongose = require('mongoose');
    // Variables
    let promises = [];
    let promisesForm = [];
    let promisesFee = [];
    let promisePreOrder = [];
    let data = {};
    let cms = {};
    let form = {};
    // Models

    app.get('/', function (req, res) {
     res.render('index')
    });


    // ************ CMS ************
    app.get('/cms', function (req, res) {
        res.render('cms/index', {title: 'CMS'})
    });

};