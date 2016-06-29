(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('SettingsController', SettingsController);

    /* @ngInject */
    function SettingsController($scope, $localStorage) {
        var vm = this;
        vm.selectedColour = $localStorage.backgroundColor;

        $scope.$watch('vm.selectedColour', function() {
            $localStorage.backgroundColor = vm.selectedColour;
        });
    }
})();
