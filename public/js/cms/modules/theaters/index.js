const cms_main = angular.module('cms');

cms_main.controller('theatersCtrl', function ($scope, $location, $state, $http, $log, httpService) {

    let ctrl = this;

    /**
     * Settings - vars
     */
    ctrl.tab = 0;
    ctrl.days = {};

    httpService.asyncGet('cms/theaters/list').then(function (snap) {
        console.log(snap);
        if(snap.code === "E_UNAUTHORIZED"){errorHandle.logout()}
        $scope.data = snap
    });

    $scope.editTheater = function (item) {
        console.log('RTA: ',item);
        $state.go('cms.slider.edit', {item: item})
    };

    $scope.deleteTheater = function () {
        console.log('ID', $scope.modalId);
        httpService.asyncPost('/cms/theaters/delete',{id:$scope.modalId}).then(function (snap) {
            console.log(snap);
            if(snap.code === "E_UNAUTHORIZED"){errorHandle.logout()}
            $scope.data = snap
        });
    };

    $scope.openModal = function (id) {
        $scope.enabled=true;
        $scope.modalId = id;
    };
    $scope.closeModal = function () {
        $scope.enabled=false;
        $scope.modalId = '';
    };

});
