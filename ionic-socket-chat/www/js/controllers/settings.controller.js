(function() {
    'use strict';

    angular
        .module('controllers')
        .controller('SettingsController', SettingsController);

    /* @ngInject */
    function SettingsController($scope, $localStorage, $ionicActionSheet, $cordovaCamera) {
        var vm = this;
        vm.background = {
            type: 'color',
            value: $localStorage.backgroundColor
        };
        vm.selectedColour = $localStorage.backgroundColor;

        //scope methods
        vm.showActionSheet = showActionSheet;

        $scope.$watch('vm.selectedColour', function() {
            if (vm.selectedColour) {
                updateBackgroundValues();
            }
        });

        function showActionSheet() {
            var obj = {
                buttons: [
                   { text: 'Cámara' },
                   { text: 'Galería' }
                ],
                titleText: 'Seleccione imagen',
                cancelText: 'Cerrar',
                cancel: function() {
                    console.log('actionSheet closed');
                },
                buttonClicked: function(index) {
                    if (index === 0) {
                        takePicture(1);
                    } else {
                        takePicture(0);
                    }
                    return true;
                }
            };

            var backgroundImageActionSheet = $ionicActionSheet.show(obj);
        }

        //private

        function updateBackgroundValues() {
            if (!vm.selectedColour) {
                return;
            }
            $localStorage.backgroundColor = vm.selectedColour;
            $localStorage.backgroundImage = null;
            vm.background.value = vm.selectedColour;
        }

        function takePicture(sourceType) {
            var options = {
                quality: 80,
                destinationType: 0, //base64
                sourceType: sourceType, //0 galeria, 1 camara
                allowEdit: false,
                targetWidth: 800,
                saveToPhotoAlbum: false,
                correctOrientation: false
            };

            $cordovaCamera.getPicture(options).then(function(imageData) {
                console.log(imageData);
                //image.src = "data:image/jpeg;base64," + imageData;
                $localStorage.backgroundImage = "data:image/jpeg;base64," + imageData;
                $localStorage.backgroundColor = null;
            }, function(err) {
                // error
            });

        }
    }
})();
