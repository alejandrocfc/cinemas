const app = angular.module('shared.services',[]);
app.factory('httpService', function($http, $q, store) {
    const httpService = {};

    httpService.asyncGet = function(url) {
        const deffered = $q.defer();
        $http({
            method:'GET',
            url: url,
            headers: {
                'Authorization' : store.get('token')
            }
        }).then(function (d) {
            console.log(d);
            deffered.resolve(d.data);
        }, function (e) {
            deffered.reject(e)
        });
        return deffered.promise;
    };
    httpService.asyncPost = function(url,params) {
        const deffered = $q.defer();
        $http({
            method: 'POST',
            url: url,
            data: params,
            headers: {
                'Authorization' : store.get('token')
            }
        }).then(function (d) {
            console.log(d);
            //dataPost = d.data;
            deffered.resolve(d.data);
        }, function (e) {
            deffered.reject(e)
        });
        return deffered.promise;
    };

    return httpService;
});
app.factory('errorHandle', function(store, $q, $window) {
    const errorHandle = {};
    errorHandle.logout = function(url) {
        store.remove('token');
        store.remove('info');
        store.remove('user');
        $window.location.href = '/'
    };
    return errorHandle;
});
app.factory('sessionService', function (store, $http, $q) {
    return{
        verifyToken : function(){
            const deffered = $q.defer();
            $http({
                method:'GET',
                url: '/cms/session',
                headers: {
                    'Authorization' : store.get('token')
                }
            }).then(function (d) {
                (d.status === 200) ? deffered.resolve(d.data) : deffered.reject();
            }, function (e) {
                deffered.reject(e)
            });
            return deffered.promise;
        }
    }

});
app.factory('userService', function (store, $window) {
    return{
        redirect : function () {
            if(store.get('token') && store.get('user'))$window.location.href = '/cms/main';
        }
    }

});
app.factory('feeService', function () {
    return {
        uid: 0,
        min: 0,
        max: 0,
        getFee: function () {
            return this.uid;
        },
        setFee: function (id) {
            this.uid = id;
        },
        getMin: function () {
            return this.min
        },
        setMin: function (min) {
            this.min = min;
        },
        getMax: function () {
            return this.max
        },
        setMax: function (max) {
            this.max = max;
        }
    };
});
