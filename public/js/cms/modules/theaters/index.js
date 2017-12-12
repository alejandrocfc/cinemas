const cms_theater = angular.module('cms');

cms_theater.controller('theatersCtrl', function ($scope, $location, $state, $http, $log, httpService) {

    console.log('HELLO FROM LIST THEATER CTRL');

    let ctrl = this;

    /**
     * Settings - vars
     */
    ctrl.tab = 0;
    ctrl.days = {};

    httpService.asyncGet('theaters/list').then(function (snap) {
        console.log(snap);
        if(snap.code === "E_UNAUTHORIZED"){errorHandle.logout()}
        $scope.data = snap
    });

    $scope.editTheater = function (item) {
        console.log('RTA: ',item);
        $state.go('cms.theater.edit', {item: item})
    };

    $scope.deleteTheater = function () {
        console.log('ID', $scope.modalId);
        httpService.asyncPost('theaters/delete',{id:$scope.modalId}).then(function (snap) {
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
