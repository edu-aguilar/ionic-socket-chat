(function() {
    'use strict';

    var chatMessage = {
        templateUrl: "js/components/chatMessage/chatMessage.html",
        bindings: {
            username: '<',
            message: '<'
        },
        controller: chatMessageController
    };

    angular
        .module('components')
        .component('chatMessage', chatMessage);

    function chatMessageController() {
        var vm = this;
        console.log(vm);
    }

})();