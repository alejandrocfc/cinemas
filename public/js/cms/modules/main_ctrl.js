var modules = angular.module('cms');

modules.controller("CMSMainCtrl", function($scope, $state){

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
        ctrl.tab = state;
        $state.go("cms."+state)
    };


});
