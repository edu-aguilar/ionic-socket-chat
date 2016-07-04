(function() {
    'use strict';

    angular
        .module('directives')
        .directive('fontColour', fontColour);

    /* @ngInject */
    function fontColour() {
        var directive = {
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attrs) {
            attrs.$observe('fontColour', function (newVal) {
                el.css('color', newVal);
            });
        }

    }
})();
