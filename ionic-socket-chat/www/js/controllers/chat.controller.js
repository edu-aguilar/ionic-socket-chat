(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('ChatController', ChatController);

    function ChatController(chat, $stateParams, $localStorage, $scope, $ionicScrollDelegate) {
        var vm = this;

        $scope.$on('$ionicView.beforeEnter', function() {
            vm.selectedBackground = {
                type: $localStorage.backgroundColor ? 'color' : 'image',
                value: $localStorage.backgroundColor || $localStorage.backgroundImage
            };
        });

        //scope vars
        vm.messages = [];
        vm.totalUsers = null;
        vm.currentUser = $stateParams.userName;

        //scope methods
        vm.sendMessage = sendMessage;

        //chat events
        chat.on('connect', onConnect);
        chat.on('login', onLogin);
        chat.on('new message', onNewMessage);
        chat.on('user joined', onUserJoined);
        chat.on('user left', onUserLeft);

        //scope methods
        function sendMessage() {
            chat.emit('new message', vm.message);
            var messageHour = moment().format("H:m");
            addMessageToList(vm.currentUser, vm.message, messageHour);
            chat.emit('stop typing');
            vm.message = "";
            updateScroll();
        }

        //chat events
        function onConnect() {
            chat.emit('add user', vm.currentUser);
        }

        function onLogin(data) {
            console.log('welcome: ' + JSON.stringify(data));
            vm.totalUsers = data.numUsers;
        }

        function onNewMessage(data) {
            console.log('new message: ' + JSON.stringify(data));
            var messageHour = moment().format("H:m");
            addMessageToList(data.username, data.message, messageHour);
            updateScroll();
        }

        function onUserJoined(data) {
            console.log('user joined: ' + JSON.stringify(data));
            vm.totalUsers = data.numUsers;
        }

        function onUserLeft(data) {
            console.log('user left: ' + JSON.stringify(data));
            vm.totalUsers = data.numUsers;
        }

        //private methods
        function addMessageToList(userName, message, hour){
            vm.messages.push({
                content: message,
                userName: userName,
                messageHour: hour
            });
        }

        function updateScroll() {
            $ionicScrollDelegate.scrollBottom(true);
        }
    }
})();
