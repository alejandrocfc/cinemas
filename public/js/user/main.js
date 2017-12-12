var user = angular.module('user', ['shared.services','angular-storage']);

user.controller('UserCtrl', function ($scope, $http, $location, $window, store, httpService, errorHandle,userService) {
    console.log('HELLO FROM USER');

    var ctrl = this;
    ctrl.tab = 'theaters.list';

    $scope.navMenu = [
        {name: 'Theaters', icon: 'fa fa-film', state: 0},
        {name: 'Movies', icon: 'fa fa-ticket', state: 1}
    ];

    //fn: valida si el panel esta activo: bolean
    $scope.isSelected = function(check) {
        return ctrl.tab === check;
    };
    //fn: activa el panel seleccionado
    $scope.selectPanel = function(state) {
        console.log(state);
        ctrl.tab = state;
    };

    httpService.asyncGet('theaters/list').then(function (snap) {
        console.log(snap);
        $scope.theaters = snap
    });

    httpService.asyncGet('movies/list').then(function (snap) {
        console.log(snap);
        $scope.movies = snap
    });

    console.log($scope);

});
