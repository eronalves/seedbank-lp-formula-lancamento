(function() {
    'use strict';

    angular.module('seedbank-app')
    .service('MailChimpService', MailChimpService);
    
    MailChimpService.$inject = ['$http', '$q'];
    function MailChimpService($http, $q) {
        var config = {
            username: 'seedbank',
            dc: 'us14',
            u: 'c25dc0142f4bcbd3625ab1691',
            id:'271152f421'
        };

        return {
            subscribe: subscribe
        };

        function subscribe(data) {
            var url = 'https://'+ config.username + '.'+config.dc +'.list-manage.com/subscribe/post-json';                    
            var defer = $q.defer();
            var params = angular.extend(data, {u: config.u, id: config.id, c:'JSON_CALLBACK'});
            $http({
                url: url,
                params: params,
                method: 'JSONP'
            }).then(function (data) {
                if(data.data.result === 'success')
                    defer.resolve(data.data);
                else
                    defer.reject(data.data);

            }, function (err) {
                defer.reject(err)
            });

            return defer.promise;
        }
    }

})();
