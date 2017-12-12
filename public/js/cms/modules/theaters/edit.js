const theater_edit = angular.module('cms');

theater_edit.controller('theaterEditCtrl', function ($scope, $log, $stateParams, $http, $state, $timeout, httpService, usSpinnerService) {
    console.log('HELLO FROM EDIT THEATER CTRL');
    //Init
    usSpinnerService.spin('spinner-1');
    if(!$stateParams.item) $state.go('cms.theaters.list');
    $scope.item = $stateParams.item;
    $scope.sending = false;//show spinner
    $scope.save = function (valid) {
        if(!valid) return;
        $scope.sending = true;//show spinner
        httpService.asyncPost('theaters/edit',{data:$scope.item}).then(function (snap) {
            console.log(snap);
            $scope.sending = false;//show spinner
            if(snap.code === "E_UNAUTHORIZED"){errorHandle.logout()}
            $state.go('cms.theaters.list');
        });
    };
});
