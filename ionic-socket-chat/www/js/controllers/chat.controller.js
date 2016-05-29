(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('ChatController', ChatController);

    function ChatController(chat, $stateParams) {
        var vm = this;

        //scope methods
        vm.sendMessage = sendMessage;

        //chat events
        chat.on('connect', onConnect);
        chat.on('new message', onNewMessage);

        function sendMessage() {
            console.log(vm.message);
        }

        function onConnect() {

        }

        function onNewMessage() {

        }
    }
})();
