const movies = angular.module('cms');

movies.config(function($stateProvider){

    $stateProvider
        .state('cms.movies', {
            abstract: true,
            url:'movies',
            templateUrl: '../../templates/cms/tabs/movies.html'
        })
        .state('cms.movies.list', {
            url:'/',
            views: {
                'movies': {
                    templateUrl: '../../templates/cms/movies/list.html',
                    controller: 'moviesCtrl'
                }
            }
        })
        .state('cms.movies.edit', {
            url:'/edit/:id',
            views: {
                'movies': {
                    templateUrl: '../../templates/cms/movies/edit.html',
                    controller: 'moviesEditCtrl'
                }
            },
            params:{item:null}
        });

});
