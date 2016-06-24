(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('MenuController', MenuController);

    function MenuController($state) {
        var vm = this;
        vm.goTo = goTo;
        activate();

        function activate() {

        }

        function goTo(where) {
            $state.go(where);
        }
    }
})();
