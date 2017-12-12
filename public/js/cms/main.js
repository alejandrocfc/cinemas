const cms = angular.module('cms', ['ui.router', 'angularSpinner', 'angular-storage', 'shared.services']);

cms.run(function ($transitions, sessionService, errorHandle) {
    $transitions.onStart({}, function() {
        sessionService.verifyToken().then(function (snap) {
            console.log('ALLOW');
            if(!snap.flag) errorHandle.logout();
        }).catch(function (e) {
            errorHandle.logout()
        });
    });
});

cms.config(['$stateProvider', '$urlRouterProvider', 'usSpinnerConfigProvider', function($stateProvider, $urlRouterProvider, usSpinnerConfigProvider) {
    $urlRouterProvider.otherwise("/theaters/");

    $stateProvider
    .state('cms', {
        abstract: true,
        url:'/',
        templateUrl: 'templates/cms/index.html',
        controller: 'CMSMainCtrl'
    });

    usSpinnerConfigProvider.setDefaults({
        lines: 9,
        length: 0,
        width: 8,
        radius: 22,
        scale: 1,
        corners: 1,
        color: '#000',
        opacity: 0.25,
        rotate: 30,
        direction: 1,
        speed: 1,
        trail: 45,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    });
}]);
