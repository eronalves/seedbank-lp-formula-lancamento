(function() {
    'use strict';

    angular.module('seedbank-app')
        .controller('MailChimpController', MailChimpController);

    MailChimpController.$inject = ['MailChimpService', 'SweetAlert'];
    function MailChimpController(MailChimpService, SweetAlert) {
        var vm = this;
        vm.emailFormat = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

        vm.merchant = {
            subscribe: function () {
                vm.merchantChimp['group[1297]'] = 1;                                            
                subscribe(vm.merchantChimp);        
            }
        };

        vm.consumer = {
            subscribe: function () {
                vm.consumerChimp['group[1297]'] = 2;
                subscribe(vm.consumerChimp);        
            }
        };

        function subscribe(data) {
            MailChimpService.subscribe(data).then(function (data) {
                SweetAlert.swal("Obrigado (;", "Confirme em seu e-mail a assinatura de nossa newsletter e aguarde mais informações em seu e-mail!", "success");

            }, function (error) {
                SweetAlert.swal("Aguarde!", "Seu e-mail está cadastrado em nossa newsletter, quando tivermos novidades você será o primeiro a recebê-las :D", "warning");
            });
        }

        function init() {
            vm.chimp = {};
        }

        init();

        return vm;
    }

})();