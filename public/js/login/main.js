var loginApp = angular.module('loginApp', ['shared.services','angular-storage']);

loginApp.controller('LoginCtrl', function ($scope, $http, $location, $window, store, httpService, errorHandle,userService) {
    console.log('HELLO FROM LOGIN');
    userService.redirect();
    $scope.submit = function (valido) {
        console.log(valido);
        if(!valido) return;
        console.log('FORM: ',$scope.form);
        httpService.asyncPost('/cms/login',$scope.form).then(function (data) {
            console.log(data);
            if(data.flag) {
                console.log('RTA: ', data);
                store.set('token', data.token);
                store.set('user', data.user);
                httpService.asyncGet('/cms/session').then(function (snap) {
                    console.log(snap);
                    $scope.redirect(snap);
                }).catch(function (e) {
                    errorHandle.logout();
                });
            }else{
                $scope.message = data.msg;
            }
        }).catch(function (e) {
            errorHandle.logout();
        });
    };

    $scope.redirect= function (data) {
        if(data.success)
            $window.location.href = '/cms';
    }

});
