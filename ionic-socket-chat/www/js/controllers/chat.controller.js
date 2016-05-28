(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('ChatController', ChatController);

    function ChatController() {
        var vm = this;

        activate();

        function activate() {
            console.log('chat controller');
        }
    }
})();
