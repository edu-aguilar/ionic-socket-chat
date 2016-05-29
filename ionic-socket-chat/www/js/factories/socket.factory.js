(function() {
    'use strict';

    angular
        .module('factories')
        .factory('chat', chat);

    function chat(socketFactory) {

        var _ioSocket = io.connect('http://chat.socket.io');

        return socketFactory({
          ioSocket: _ioSocket
        });
    }
})();
