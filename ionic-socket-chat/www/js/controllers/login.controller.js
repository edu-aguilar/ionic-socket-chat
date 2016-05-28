(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($state) {
        var vm = this;
        vm.doLogin = doLogin;

        activate();

        function activate() {}

        function doLogin() {
            console.log(vm.userName);
            if(angular.isUndefined(vm.userName) || vm.userName === null) {
                alert('nickname error');
            } else {
                $state.go('app.chat', {userName: vm.userName});
            }
        }
    }
})();
