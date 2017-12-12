const cms_movies = angular.module('cms');

cms_movies.controller('moviesCtrl', function ($scope, $location, $state, $http, $log, httpService) {

    console.log('HELLO FROM LIST MOVIES CTRL');

    let ctrl = this;

    /**
     * Settings - vars
     */
    ctrl.tab = 0;
    ctrl.days = {};

    httpService.asyncGet('movies/list').then(function (snap) {
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
        httpService.asyncPost('movies/delete',{id:$scope.modalId}).then(function (snap) {
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
