(function() {
    'use strict';

    var chatMessage = {
        templateUrl: "js/components/chatMessage/chatMessage.html",
        bindings: {
            username: '<',
            message: '<',
            messagehour: '<',
            currentuser: '<'
        },
        controller: chatMessageController
    };

    angular
        .module('components')
        .component('chatMessage', chatMessage);

    function chatMessageController(chatMessageData) {
        var vm = this;
        vm.extUser = vm.currentuser !== vm.username;
        vm.colorName = chatMessageData.getUserColor(vm.username);
    }

    function getUserColor() {

    }

})();


(function() {
    'use strict';

    angular
        .module('components')
        .factory('chatMessageData', chatMessageData);

    /* @ngInject */
    function chatMessageData() {
        var service = {
            getUserColor: getUserColor
        };

        var data = {};

        return service;

        function getUserColor(property) {
            var color = null;
            if (data.hasOwnProperty(property)) {
                color = data[property];
            } else {
                var newColor = "#"+((1<<24)*Math.random()|0).toString(16);
                data[property] = newColor;
                color = newColor;
            }
            return color;
        }
    }
})();
