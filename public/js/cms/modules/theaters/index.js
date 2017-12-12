const cms_main = angular.module('cms');

cms_main.controller('theatersCtrl', function ($scope, $location, $state, $http, $log) {

    var ctrl = this;

    /**
     * Settings - vars
     */
    ctrl.tab = 0;
    ctrl.days = {};

    $scope.data = [
        {content:'asdasd',title:'qweqwe',position:0},
        {content:'asdasd',title:'qweqwe',position:1},
        {content:'asdasd',title:'qweqwe',position:2}
    ];


    $scope.editSlider = function (item) {
        console.log('RTA: ',item);
        $state.go('cms.slider.edit', {item: item})
    };

    $scope.addNewSlider = function () {
        $http({
            method: 'POST',
            url: '/api/cms/slider/new',
            data: {id: $scope.data.length}
        }).then(function (response) {
            console.log('RTA: ',response.data);
            if(response.status === 200){
                var data = response.data;
                $state.go('cms.slider.edit', {item: data, id: data._id})
            }
        }, function (response) {
            console.log('ERROR RTA: ',response);
        });
    };

    $scope.deleteSlider = function () {
        $log.log('ID', $scope.modalId);
        $http({
            method: 'POST',
            url: '/api/cms/slider/delete',
            data: {id: $scope.modalId}
        }).then(function (response) {
            console.log('RTA: ',response.data);
            if(response.status === 200){
                renderService.setFlag(false);
            }
        }, function (response) {
            console.log('ERROR RTA: ',response);
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
