(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('ChatController', ChatController);

    function ChatController(chat, $stateParams) {
        var vm = this;
        vm.messages = [];

        //scope methods
        vm.sendMessage = sendMessage;

        //chat events
        chat.on('connect', onConnect);
        chat.on('new message', onNewMessage);

        function sendMessage() {
            chat.emit('new message', vm.message);
            addMessageToList($stateParams.userName, vm.message);
            chat.emit('stop typing');
            vm.message = "";
        }

        function addMessageToList(userName, message){
            vm.messages.push({
                content: message,
                userName: userName
            });
        }

        function onConnect() {
            chat.emit('add user', $stateParams.userName);
        }

        function onNewMessage(data) {
            addMessageToList(data.username, data.message);
        }
    }
})();
