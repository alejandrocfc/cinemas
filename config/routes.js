module.exports = function(app, variable) {

    // Init config
    app.set('view engine', 'jade');

    // Modules
    const moment = require('moment');
    const moongose = require('mongoose');
    const Services = require('./services');
    const Promise = require('bluebird');
    // Models
    const Theater = require('../models/theaters');
    const Movie = require('../models/movies');
    const User = require('../models/users');

    app.get('/', function (req, res) {
     res.render('index')
    });
    app.get('/theaters/list', function (req, res) {
        Theater.find()
            .exec( function(err, data) {
                if (err) {
                    res.send(err);
                }else if(data){
                    res.json(data);
                }else{res.send({msg:'HELLO'});}

            });
    });
    app.get('/movies/list', function (req, res) {
        Movie.find()
            .populate('theaterID')
            .exec( function(err, data) {
                if (err) {
                    res.send(err);
                }else if(data){
                    res.json(data);
                }else{res.send({msg:'HELLO'});}

            });
    });

    // ************ CMS ************
    app.get('/cms/main', function (req, res) {
        res.render('cms/index', {title: 'CMS'})
    });
    app.route('/cms')
        .get(function (req, res) {
            res.render('login')
        })
        .post(function (req, res) {
            console.log('SIGN IN....');
            let data = req.body;
            console.log(data);
            User.findOne({'email' :data.email}, function(err, user) {
                if (err){
                    console.log('ERROR');
                    res.json(err);
                }else if (!user) {
                    // if no user is found, return the message
                    console.log('loginMessage', 'No user found.');
                    res.json({flag:false,msg:'No user found'});

                }else if (!user.validPassword(data.password)) {
                    console.log('loginMessage', 'Oops! Wrong password.');
                    res.json({flag:false,msg:'Oops! Wrong password.'});
                }else {
                    console.log('USER: ', user);
                    res.json({flag:true,user:user,token:Services.createToken(user)});
                }
            });

        });
    app.get('/cms/theaters/list', checkSession, function (req, res) {
        Theater.find()
            .exec( function(err, data) {
                if (err) {
                    res.send(err);
                }else if(data){
                    res.json(data);
                }else{res.send({msg:'HELLO'});}

            });
    });
    app.get('/cms/theaters/add', checkSession, function (req, res) {
        const theater = new Theater;
        const today = moment();
        theater.createAt = today;
        theater.updateAt = today;
        theater.save().then(function(snap, arr) {
            res.send(snap);
        });
    });
    app.post('/cms/theaters/edit', checkSession, function (req, res) {
        const data = req.body.data;
        data.updateAt = moment();
        Theater.findByIdAndUpdate(data._id,data, function(err, snap){
            if (err) res.json(err);
            if(!snap) res.send('NOT FOUND');
            res.json(snap)
        });
    });
    app.post('/cms/theaters/delete', checkSession, function (req, res) {
        const data = req.body;
        Theater.findByIdAndRemove(data.id, {}, function(err, snap){
            if (err) res.json(err);
            res.json(snap)
        });
    });
    app.get('/cms/movies/list', checkSession, function (req, res) {
        Movie.find()
            .populate('theaterID')
            .exec( function(err, data) {
                if (err) {
                    res.send(err);
                }else if(data){
                    res.json(data);
                }else{res.send({msg:'HELLO'});}

            });
    });
    app.get('/cms/movies/add', checkSession, function (req, res) {
        const movie = new Movie;
        const today = moment();
        movie.createAt = today;
        movie.updateAt = today;
        movie.save().then(function(snap, arr) {
            res.send(snap);
        });
    });
    app.post('/cms/movies/edit', checkSession, function (req, res) {
        const data = req.body.data;
        data.updateAt = moment();
        Movie.findByIdAndUpdate(data._id,data, function(err, snap){
            if (err) res.json(err);
            if(!snap) res.send('NOT FOUND');
            res.json(snap)
        });
    });
    app.post('/cms/movies/delete', checkSession, function (req, res) {
        const data = req.body;
        Movie.findByIdAndRemove(data.id, {}, function(err, snap){
            if (err) res.json(err);
            res.json(snap)
        });
    });

    // ************ MIDDLEWARE ************
    function checkSession(req, res, next) {
        const token = req.headers['authorization'];
        let isOk = Services.verifyToken(token);
        console.log(isOk);
        if(isOk.success)next();
        else{res.json(isOk);}
    }
    app.get('/cms/session', function (req, res) {
        const token = req.headers['authorization'];
        res.json(Services.verifyToken(token));
    });

};