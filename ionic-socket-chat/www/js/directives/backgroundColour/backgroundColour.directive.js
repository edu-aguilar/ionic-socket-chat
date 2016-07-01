(function() {
    'use strict';

    angular
        .module('directives')
        .directive('backgroundColour', backgroundColour);

    /* @ngInject */
    function backgroundColour() {
        var directive = {
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attrs) {
            attrs.$observe('backgroundColour', function (newVal) {
                el.css('background-color', newVal);
            });
        }

    }
})();
