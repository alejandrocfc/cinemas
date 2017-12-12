const theaters = angular.module('cms');

theaters.config(function($stateProvider){

    $stateProvider
        .state('cms.theaters', {
            abstract: true,
            url:'theaters',
            templateUrl: '../../templates/cms/tabs/theaters.html'
        })
        .state('cms.theaters.list', {
            url:'/',
            views: {
                'theaters': {
                    templateUrl: '../../templates/cms/theaters/list.html',
                    controller: 'theatersCtrl'
                }
            }
        })
        .state('cms.theaters.edit', {
            url:'/edit/:id',
            views: {
                'theaters': {
                    templateUrl: '../../templates/cms/theaters/edit.html',
                    controller: 'theaterEditCtrl'
                }
            },
            params:{item:null}
        });

});
