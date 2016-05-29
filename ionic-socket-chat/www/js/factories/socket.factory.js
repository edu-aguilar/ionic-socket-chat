(function() {
    'use strict';

    angular
        .module('factories')
        .factory('socketFactory', socketFactory);

    function socketFactory() {

        var _ioSocket = io.connect('http://chat.socket.io');

        return {
            ioSocket: _ioSocket
        }
    }
})();
