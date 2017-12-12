var modules = angular.module('cms');

modules.controller("CMSMainCtrl", function($scope, $state, store, httpService, errorHandle){
    console.log('HELLO FROM MAIN CTRL');

    var ctrl = this;
    ctrl.tab = 'theaters.list';

    $scope.navMenu = [
        {name: 'Theaters', icon: 'fa fa-film', state: 'theaters.list'},
        {name: 'Movies', icon: 'fa fa-ticket', state: 'movies.list'},
        {name: 'Sing Out', icon: 'fa fa-sign-out', state: 'singout'}
    ];

    //fn: valida si el panel esta activo: bolean
    $scope.isSelected = function(check) {
        return ctrl.tab === check;
    };
    //fn: activa el panel seleccionado
    $scope.selectPanel = function(state) {
        if(state === 'singout'){
            errorHandle.logout();
            return;
        }
        ctrl.tab = state;
        $state.go("cms."+state)
    };

    $scope.addTheater = function () {
        httpService.asyncGet('theaters/add').then(function (snap) {
            console.log(snap);
            if(snap.code === "E_UNAUTHORIZED"){errorHandle.logout()}
            $state.go('cms.theaters.edit',{item: snap, id: snap._id});
        });
    };
    $scope.addMovie = function () {
        httpService.asyncGet('movies/add').then(function (snap) {
            console.log(snap);
            if(snap.code === "E_UNAUTHORIZED"){errorHandle.logout()}
            $state.go('cms.movies.edit',{item: snap, id: snap._id});
        });
    }
});
